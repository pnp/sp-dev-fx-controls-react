#!/usr/bin/env node
import fs from 'fs';

async function updateVersion() {
  const pkgContents = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const filePath = './src/common/telemetry/version.ts';
  const fileContents = `export const version: string = "{versionPlaceholder}";`;
  const newContents = fileContents.replace("{versionPlaceholder}", pkgContents.version);
  console.log(`Updating version number to: ${pkgContents.version}`);
  fs.writeFileSync(filePath, newContents, { encoding: "utf8" });
}

export async function runAsync(options) {
  await updateVersion(options);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  updateVersion().catch(e => {
    console.error('Error: ', e);
    process.exit(1);
  });

}