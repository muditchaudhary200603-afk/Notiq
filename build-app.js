const path = require('path');
const fs = require('fs');

let esbuild;
try {
  esbuild = require('esbuild');
} catch (error) {
  console.error('Missing dependency: esbuild');
  console.error('Run: npm install --save-dev esbuild');
  process.exit(1);
}

const root = __dirname;
const infile = path.join(root, 'app.js');
const outfile = path.join(root, 'app.compiled.js');

if (!fs.existsSync(infile)) {
  console.error(`Build failed: source file not found: ${infile}`);
  process.exit(1);
}

esbuild.build({
  entryPoints: [infile],
  outfile,
  bundle: false,
  minify: false,
  sourcemap: false,
  target: ['es2020'],
  loader: { '.js': 'jsx' },
  jsx: 'transform',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  legalComments: 'none',
  charset: 'utf8'
}).then(() => {
  const size = fs.statSync(outfile).size;
  console.log(`Built app.compiled.js (${size} bytes)`);
}).catch((error) => {
  console.error('Build failed.');
  if (error?.errors) {
    for (const e of error.errors) {
      console.error(`${e.location?.file || 'unknown'}:${e.location?.line || 0}:${e.location?.column || 0} ${e.text}`);
    }
  } else {
    console.error(error.message || error);
  }
  process.exit(1);
});
