const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const assetsDir = path.join(root, 'assets');
const publicDir = path.join(root, 'public');

const requiredFiles = ['icon.png'];

for (const file of requiredFiles) {
  const source = path.join(assetsDir, file);
  const target = path.join(publicDir, file);

  if (!fs.existsSync(source)) {
    console.warn(`[sync-brand-assets] Missing source file: ${source}`);
    continue;
  }

  fs.copyFileSync(source, target);
  console.log(`[sync-brand-assets] Copied ${file}`);
}
