import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const workflow = 'plugins/prisma/skills/prisma-build-and-deploy';
const github = 'plugins/prisma/skills/prisma-github-deploy';

test('packaging preserves authored files and verifies the complete bundle', async () => {
  const temporary = await mkdtemp(join(tmpdir(), 'prisma-plugin-test-'));
  try {
    for (const relative of [
      'scripts/package-plugin.mjs', 'scripts/export-marketplace.py', 'plugins/prisma/plugin.json',
      'assets/prisma-icon.svg', 'marketplace', 'docs/releases', workflow, github,
    ]) {
      await mkdir(dirname(join(temporary, relative)), { recursive: true });
      await cp(join(root, relative), join(temporary, relative), { recursive: true });
    }
    const run = (...args) => spawnSync(process.execPath,
      [join(temporary, 'scripts/package-plugin.mjs'), ...args],
      { encoding: 'utf8', timeout: 90_000 });
    const pass = (result) => assert.equal(result.status, 0, result.stderr || result.error?.message);
    const skillPath = join(temporary, workflow, 'SKILL.md');
    const referencePath = join(temporary, workflow, 'references/toolchain.md');
    const authored = await readFile(skillPath);
    const reference = await readFile(referencePath);
    const githubFiles = [join(temporary, github, 'SKILL.md'), join(temporary, github, 'references/github-deploy.md')];
    const githubContent = await Promise.all(githubFiles.map((path) => readFile(path)));
    // A maintainer's additional supporting file must survive too.
    const extraReference = join(temporary, workflow, 'references/local-note.md');
    await writeFile(extraReference, 'Authored content must survive packaging.\n');

    pass(run());
    pass(run('--check'));
    assert.deepEqual((await readdir(join(temporary, 'plugins/prisma/skills'))).sort(), [
      'prisma-build-and-deploy', 'prisma-composer-core-concepts', 'prisma-github-deploy',
    ]);
    const provenancePath = join(temporary, 'plugins/prisma/upstream.json');
    const provenance = await readFile(provenancePath);
    pass(run());
    assert.deepEqual(await readFile(provenancePath), provenance);
    assert.deepEqual(await readFile(skillPath), authored);
    assert.deepEqual(await readFile(referencePath), reference);
    for (const [index, path] of githubFiles.entries()) {
      assert.deepEqual(await readFile(path), githubContent[index]);
    }
    assert.equal(await readFile(extraReference, 'utf8'), 'Authored content must survive packaging.\n');

    const upstreamPath = join(temporary, 'plugins/prisma/skills/prisma-composer-core-concepts/SKILL.md');
    for (const path of [skillPath, referencePath, ...githubFiles, upstreamPath]) {
      const before = await readFile(path);
      await writeFile(path, Buffer.concat([before, Buffer.from('\nmodified\n')]));
      assert.notEqual(run('--check').status, 0);
      await writeFile(path, before);
    }
    const unexpected = join(temporary, 'plugins/prisma/skills/unexpected');
    await mkdir(unexpected);
    assert.notEqual(run('--check').status, 0);
    await rm(unexpected, { recursive: true });

    for (const path of [skillPath, referencePath, ...githubFiles]) {
      const before = await readFile(path);
      await rm(path);
      assert.notEqual(run('--check').status, 0);
      assert.notEqual(run().status, 0, 'Missing authored input must fail before rebuilding.');
      assert.deepEqual(await readFile(provenancePath), provenance);
      await writeFile(path, before);
    }
    pass(run('--check'));

    // The complete marketplace export reuses those exact skills but retains the
    // published identity. Private repo files must never enter the upload.
    // Use a documented release fixture so this regression still runs while the
    // source manifest moves through subsequent development-preview versions.
    const manifestPath = join(temporary, 'plugins/prisma/plugin.json');
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    manifest.version = '0.4.1';
    await writeFile(manifestPath, JSON.stringify(manifest));
    pass(run());
    await writeFile(join(temporary, '.env'), 'PRIVATE_FIXTURE=must-not-be-exported\n');
    const exportPath = join(temporary, 'release');
    const exportRun = (...args) => spawnSync('python3',
      [join(temporary, 'scripts/export-marketplace.py'), exportPath, ...args],
      { encoding: 'utf8', timeout: 30_000 });
    pass(exportRun());
    pass(exportRun('--check'));
    const version = JSON.parse(await readFile(join(temporary, 'plugins/prisma/plugin.json'), 'utf8')).version;
    const archivePath = join(exportPath, `prisma-${version}.zip`);
    const archive = await readFile(archivePath);
    pass(exportRun());
    assert.deepEqual(await readFile(archivePath), archive, 'Exports must be byte-repeatable.');
    pass(spawnSync('python3', ['-c', `
import json, pathlib, sys, zipfile
root, archive_path = map(pathlib.Path, sys.argv[1:])
with zipfile.ZipFile(archive_path) as archive:
    names = archive.namelist()
    manifest = json.loads(archive.read('plugin.json'))
    assert manifest['name'] == 'app-6ab4ed5292d48191bc192893c8c83045'
    assert manifest['version'] == json.loads((root / 'plugins/prisma/plugin.json').read_text())['version']
    assert sorted(n.split('/')[1] for n in names if n.endswith('/SKILL.md')) == ['prisma-build-and-deploy', 'prisma-composer-core-concepts', 'prisma-github-deploy']
    for name in names:
        assert name in ['plugin.json', 'mcp.json', 'LICENSE', 'assets/prisma-icon.png'] or name.startswith('skills/')
        if name.startswith('skills/'):
            assert archive.read(name) == (root / 'plugins/prisma' / name).read_bytes()
    config = json.loads(archive.read('mcp.json'))
    assert config['mcpServers'] == {'prisma': {'type': 'streamable-http', 'url': 'https://mcp.prisma.io/mcp'}}
    extension = manifest['extensions']['com.openai']
    assert 'countries' not in extension['publication']
    assert 'demo_recording_url' not in extension['review']
    assert len(extension['review']['test_cases']['positive']) == 5
    assert len(extension['review']['test_cases']['negative']) == 3
    assert archive.read('assets/prisma-icon.png') == (root / 'marketplace/assets/prisma-icon.png').read_bytes()
`, temporary, archivePath], { encoding: 'utf8' }));
    await writeFile(archivePath, 'invalid zip');
    assert.notEqual(exportRun('--check').status, 0);
    await writeFile(archivePath, archive);
    await writeFile(`${archivePath}.sha256`, 'incorrect checksum\n');
    assert.notEqual(exportRun('--check').status, 0);
    pass(exportRun());
    await writeFile(skillPath, Buffer.concat([authored, Buffer.from('\nmodified\n')]));
    assert.notEqual(exportRun().status, 0, 'Stale skill content must fail export.');
    await writeFile(skillPath, authored);
    manifest.version = '0.4.2-dev.1';
    await writeFile(manifestPath, JSON.stringify(manifest));
    pass(run());
    assert.notEqual(exportRun().status, 0, 'Development previews must not be exported for publication.');

    // Neither authored skill may be covered by a generated-content ignore.
    for (const directory of [workflow, github]) {
      const ignored = spawnSync('git', ['check-ignore', '--no-index', `${directory}/SKILL.md`], { cwd: root });
      assert.equal(ignored.status, 1);
    }
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});
