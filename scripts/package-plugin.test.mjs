import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const workflow = 'plugins/prisma/skills/prisma-build-and-deploy';

test('packaging preserves authored files and verifies the complete bundle', async () => {
  const temporary = await mkdtemp(join(tmpdir(), 'prisma-plugin-test-'));
  try {
    for (const relative of [
      'scripts/package-plugin.mjs', 'plugins/prisma/plugin.json',
      'assets/prisma-icon.svg', workflow,
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
    // A maintainer's additional supporting file must survive too.
    const extraReference = join(temporary, workflow, 'references/local-note.md');
    await writeFile(extraReference, 'Authored content must survive packaging.\n');

    pass(run());
    pass(run('--check'));
    const provenancePath = join(temporary, 'plugins/prisma/upstream.json');
    const provenance = await readFile(provenancePath);
    pass(run());
    assert.deepEqual(await readFile(provenancePath), provenance);
    assert.deepEqual(await readFile(skillPath), authored);
    assert.deepEqual(await readFile(referencePath), reference);
    assert.equal(await readFile(extraReference, 'utf8'), 'Authored content must survive packaging.\n');

    const upstreamPath = join(temporary, 'plugins/prisma/skills/prisma-composer-core-concepts/SKILL.md');
    for (const path of [skillPath, referencePath, upstreamPath]) {
      const before = await readFile(path);
      await writeFile(path, Buffer.concat([before, Buffer.from('\nmodified\n')]));
      assert.notEqual(run('--check').status, 0);
      await writeFile(path, before);
    }
    const unexpected = join(temporary, 'plugins/prisma/skills/unexpected');
    await mkdir(unexpected);
    assert.notEqual(run('--check').status, 0);
    await rm(unexpected, { recursive: true });

    await rm(referencePath);
    assert.notEqual(run('--check').status, 0);
    assert.notEqual(run().status, 0, 'Missing authored input must fail before rebuilding.');
    assert.deepEqual(await readFile(provenancePath), provenance);
    assert.deepEqual(await readFile(skillPath), authored);
    await writeFile(referencePath, reference);
    pass(run('--check'));

    // The tracked workflow must not be accidentally covered by a generated-content ignore.
    const ignored = spawnSync('git', ['check-ignore', '--no-index', `${workflow}/SKILL.md`], { cwd: root });
    assert.equal(ignored.status, 1);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});
