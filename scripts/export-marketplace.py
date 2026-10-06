#!/usr/bin/env python3
"""Export the focused bundle for the existing OpenAI listing; no third-party dependencies."""

import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
import zipfile

ROOT = Path(__file__).resolve().parent.parent
BUNDLE = ROOT / "plugins/prisma"
MARKETPLACE = ROOT / "marketplace"


def json_bytes(value):
    return (json.dumps(value, indent=2, ensure_ascii=False) + "\n").encode()


def package_files():
    # Refuse stale or modified generated content before exporting anything.
    subprocess.run(["node", str(ROOT / "scripts/package-plugin.mjs"), "--check"], check=True)
    manifest = json.loads((BUNDLE / "plugin.json").read_text())
    version = manifest["version"]
    if not re.fullmatch(r"\d+\.\d+\.\d+", version):
        raise ValueError("Marketplace exports require a stable release version.")
    metadata = json.loads((MARKETPLACE / "metadata.json").read_text())
    manifest["name"] = metadata["name"]
    openai = manifest["extensions"]["com.openai"]
    openai["interface"].update(metadata["interface"])
    openai["review"] = {
        "test_cases": json.loads((MARKETPLACE / "review-cases.json").read_text()),
    }
    # Omit availability, demo and private access fields to preserve portal values.
    openai["publication"] = {
        "release_notes": (ROOT / "docs/releases" / f"{version}.md").read_text().strip(),
    }
    files = {"plugin.json": json_bytes(manifest), "mcp.json": (MARKETPLACE / "mcp.json").read_bytes()}
    provenance = json.loads((BUNDLE / "upstream.json").read_text())
    for name in provenance["files"]:
        if name.startswith("skills/") or name == "LICENSE":
            files[name] = (BUNDLE / name).read_bytes()
    files["assets/prisma-icon.png"] = (MARKETPLACE / "assets/prisma-icon.png").read_bytes()
    return version, files


def check_archive(path, files):
    with zipfile.ZipFile(path) as archive:
        if sorted(archive.namelist()) != sorted(files):
            raise ValueError("Archive file inventory differs from the release sources.")
        for name, content in files.items():
            if archive.read(name) != content:
                raise ValueError(f"Archive differs from source: {name}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path, help="Output directory (outside the source bundle)")
    parser.add_argument("--check", action="store_true", help="Check an existing ZIP and checksum without writing")
    args = parser.parse_args()
    version, files = package_files()
    output = args.output.resolve()
    if output == BUNDLE or BUNDLE in output.parents:
        raise ValueError("Output must be outside plugins/prisma.")
    archive = output / f"prisma-{version}.zip"
    checksum = archive.with_suffix(".zip.sha256")
    if not args.check:
        output.mkdir(parents=True, exist_ok=True)
        # Fixed order, timestamps, permissions and stored entries give identical bytes
        # across rebuilds without relying on a particular compression-library version.
        with zipfile.ZipFile(archive, "w") as target:
            for name, content in sorted(files.items()):
                info = zipfile.ZipInfo(name, (1980, 1, 1, 0, 0, 0))
                info.create_system = 3
                info.external_attr = 0o100644 << 16
                target.writestr(info, content)
    check_archive(archive, files)
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    checksum_text = f"{digest}  {archive.name}\n"
    if args.check:
        if checksum.read_text() != checksum_text:
            raise ValueError("Checksum does not match the archive.")
    else:
        checksum.write_text(checksum_text)
    print(f"Verified {archive}: {len(files)} files; SHA-256 {digest}")


if __name__ == "__main__":
    main()
