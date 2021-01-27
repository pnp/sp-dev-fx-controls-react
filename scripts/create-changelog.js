const changelog = require('../CHANGELOG.json');
const fs = require('fs');

if (changelog.versions && changelog.versions.length > 0) {
  const markdown = [];

  markdown.push(`# Releases`);
  markdown.push(``);

  // Loop over all the change log versions
  for (const entry of changelog.versions) {
    markdown.push(`## ${entry.version}`);
    markdown.push(``);
    // Check if entry contains change information
    if (entry.changes) {
      // Loop over all change types
      for (const changeName in entry.changes) {
        const typeChanges = entry.changes[changeName];
        if (typeChanges.length > 0) {
          let name = changeName === "new" ? "new control(s)" : changeName;
          markdown.push(`### ${name.charAt(0).toUpperCase() + name.slice(1)}`);
          markdown.push(``);

          // Add each change text
          for (const msg of typeChanges) {
            markdown.push(`- ${msg}`);
          }
          markdown.push(``);
        }
      }
    }

    // Add the contributions to the MD file
    if (entry.contributions && entry.contributions.length > 0) {
      markdown.push(`### Contributors`);
      markdown.push(``);
      markdown.push(`Special thanks to our contributor${entry.contributions.length > 1 ? "s (in alphabetical order)" : "" }: ${entry.contributions.join(', ')}.`);
      markdown.push(``);
    }
  }

  if (markdown.length > 2) {
    fs.writeFileSync('CHANGELOG.md', markdown.join('\n'));
  }
}
