const fs = require('fs');
const path = require('path');
const changelog = fs.readFileSync(path.join(__dirname, '../CHANGELOG.md'), 'utf8');
fs.writeFileSync(path.join(__dirname, '../docs/documentation/docs/about/release-notes.md'), changelog, 'utf-8');
