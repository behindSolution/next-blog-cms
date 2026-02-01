const fs = require('node:fs');
const path = require('node:path');

const directive = `'use client';\n`;
const targets = [
  path.join(__dirname, '..', 'dist', 'admin', 'index.js'),
  path.join(__dirname, '..', 'dist', 'admin', 'index.cjs')
];

for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  const contents = fs.readFileSync(file, 'utf8');
  if (contents.startsWith(directive)) continue;
  fs.writeFileSync(file, directive + contents);
}
