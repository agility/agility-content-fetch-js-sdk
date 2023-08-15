const esbuild = require('esbuild');
const { execSync } = require('child_process');
const path = require('path');

console.log("Building...", path.resolve(__dirname, "src/index.ts"))
console.log("Building...", path.resolve(__dirname, "dist/browser.js"))

execSync('tsc --emitDeclarationOnly');

// Build for browser
esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outfile: './dist/browser.js',
  platform: 'browser',
}).catch(() => process.exit(1));

// Build for Node.js
esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outfile: './dist/node.js',
  platform: 'node',
}).catch(() => process.exit(1));
