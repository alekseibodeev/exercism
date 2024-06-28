const { argv, exit } = require('node:process');
const { rmSync, accessSync, constants } = require('node:fs');
const { resolve } = require('node:path');

if (argv.length !== 3) {
  console.log('Wrong number of arguments.');
  console.log('Usage: node cleanup.js [path-to-folder]');
  exit(1);
}

const path = argv[2];

if (path === 'node_modules') {
  console.log("Can't clean up [node_modules] directory.");
  exit(1);
}

try {
  accessSync(path, constants.R_OK | constants.W_OK);
} catch (error) {
  console.log(error.message);
  exit(1);
}

try {
  rmSync(resolve(path, 'HELP.md'));
  rmSync(resolve(path, '.eslintrc'));
  rmSync(resolve(path, '.gitignore'));
  rmSync(resolve(path, '.npmrc'));
  rmSync(resolve(path, 'babel.config.js'));
  rmSync(resolve(path, 'LICENSE'));
  rmSync(resolve(path, 'package.json'));
} catch (error) {
  console.log(error.message);
  exit(1);
}

console.log(`\nDirectory [${path}] is cleaned up successfully.\n`);
exit(0);
