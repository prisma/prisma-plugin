#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { cp, lstat, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Update the version, tarball and npm dist.integrity together after reviewing an upstream release.
const source = {
  name: '@prisma/composer',
  version: '0.21.0',
  tarball: 'https://registry.npmjs.org/@prisma/composer/-/composer-0.21.0.tgz',
  integrity: 'sha512-IIoDrcyz9ttkd7auUWgpEr6jGbSmnJF+PkKdxxgFmcSll6jnNIcHyJVLyrg1ZhthKbMmqymJmKCorkFPHKAiXA==',
};
const skill = 'prisma-composer-core-concepts';
const workflow = 'prisma-build-and-deploy';
const expectedSkills = [workflow, skill].sort();
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'plugins/prisma');
const generated = [`skills/${skill}`, 'assets', 'LICENSE', 'upstream.json'];
const hash = (data) => createHash('sha256').update(data).digest('hex');
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;

async function fileHashes(directory, prefix = '') {
  const result = {};
  for (const entry of (await readdir(directory)).sort()) {
    const relative = prefix ? `${prefix}/${entry}` : entry;
    if (relative === 'upstream.json') continue;
    const path = join(directory, entry);
    const stat = await lstat(path);
    if (stat.isDirectory()) Object.assign(result, await fileHashes(path, relative));
    else if (stat.isFile()) result[relative] = hash(await readFile(path));
    else throw new Error(`Unexpected non-regular file: ${relative}`);
  }
  return result;
}

async function check() {
  const provenance = JSON.parse(await readFile(join(output, 'upstream.json'), 'utf8'));
  if (JSON.stringify(provenance.source) !== JSON.stringify(source)) {
    throw new Error('The bundle uses a different upstream release. Rebuild it.');
  }
  if (JSON.stringify((await readdir(join(output, 'skills'))).sort()) !== JSON.stringify(expectedSkills)) {
    throw new Error(`The bundle must contain exactly these skills: ${expectedSkills.join(', ')}.`);
  }
  const actual = await fileHashes(output);
  if (JSON.stringify(actual) !== JSON.stringify(provenance.files)) {
    throw new Error('Bundle files changed, are missing, or were added. Rebuild it.');
  }
  if (actual['assets/prisma-icon.svg'] !== hash(await readFile(join(root, 'assets/prisma-icon.svg')))) {
    throw new Error('The source icon changed. Rebuild the bundle.');
  }
  console.log(`Verified prisma: ${workflow} plus ${skill} from ${source.name}@${source.version}; ${Object.keys(actual).length} files.`);
}

async function build() {
  // Authored files are required inputs, never generated or replaced by the packager.
  await readFile(join(output, 'skills', workflow, 'SKILL.md'));
  await readFile(join(output, 'skills', workflow, 'references/toolchain.md'));
  const temporary = await mkdtemp(join(tmpdir(), 'prisma-plugin-'));
  try {
    console.log(`Downloading ${source.name}@${source.version}…`);
    const response = await fetch(source.tarball, { signal: AbortSignal.timeout(60_000) });
    if (!response.ok) throw new Error(`Download failed: HTTP ${response.status}`);
    const archive = Buffer.from(await response.arrayBuffer());
    const integrity = `sha512-${createHash('sha512').update(archive).digest('base64')}`;
    if (integrity !== source.integrity) throw new Error('The npm archive failed its integrity check.');
    const archivePath = join(temporary, 'composer.tgz');
    await writeFile(archivePath, archive);

    // Extract only the skill, license and package identity. Never install or execute package code.
    execFileSync('tar', [
      '-xzf', archivePath, '-C', temporary,
      'package/package.json', 'package/LICENSE', `package/skills/${skill}`,
    ], { stdio: 'pipe' });
    const upstream = join(temporary, 'package');
    const pkg = JSON.parse(await readFile(join(upstream, 'package.json'), 'utf8'));
    if (pkg.name !== source.name || pkg.version !== source.version || pkg.license !== 'Apache-2.0') {
      throw new Error('Unexpected upstream package identity or license.');
    }
    const skillText = await readFile(join(upstream, 'skills', skill, 'SKILL.md'), 'utf8');
    if (!skillText.startsWith(`---\nname: ${skill}\n`)) throw new Error('Unexpected upstream skill name.');

    const staged = join(temporary, 'bundle');
    await mkdir(join(staged, 'skills'), { recursive: true });
    await mkdir(join(staged, 'assets'));
    await cp(join(upstream, 'skills', skill), join(staged, 'skills', skill), { recursive: true });
    await cp(join(output, 'skills', workflow), join(staged, 'skills', workflow), { recursive: true });
    await cp(join(upstream, 'LICENSE'), join(staged, 'LICENSE'));
    await cp(join(root, 'assets/prisma-icon.svg'), join(staged, 'assets/prisma-icon.svg'));
    await cp(join(output, 'plugin.json'), join(staged, 'plugin.json'));
    await writeFile(join(staged, 'upstream.json'), json({
      source,
      skill,
      repository: 'https://github.com/prisma/composer',
      license: pkg.license,
      files: await fileHashes(staged),
    }));

    // Finish downloading and validating before replacing the previous generated content.
    for (const entry of generated) {
      await rm(join(output, entry), { recursive: true, force: true });
      await cp(join(staged, entry), join(output, entry), { recursive: true });
    }
    await check();
    console.log(`Packaged ${output}`);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

try {
  const args = process.argv.slice(2);
  if (args.length === 0) await build();
  else if (args.length === 1 && args[0] === '--check') await check();
  else throw new Error('Usage: node scripts/package-plugin.mjs [--check]');
} catch (error) {
  console.error(`Packaging failed: ${error.message}`);
  process.exitCode = 1;
}
