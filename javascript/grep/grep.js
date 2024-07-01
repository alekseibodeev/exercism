#!/usr/bin/env node

// The above line is a shebang. On Unix-like operating systems, or environments,
// this will allow the script to be run by node, and thus turn this JavaScript
// file into an executable. In other words, to execute this file, you may run
// the following from your terminal:
//
// ./grep.js args
//
// If you don't have a Unix-like operating system or environment, for example
// Windows without WSL, you can use the following inside a window terminal,
// such as cmd.exe:
//
// node grep.js args
//
// Read more about shebangs here: https://en.wikipedia.org/wiki/Shebang_(Unix)

const fs = require('fs');
const path = require('path');

/**
 * Reads the given file and returns lines.
 *
 * This function works regardless of POSIX (LF) or windows (CRLF) encoding.
 *
 * @param {string} file path to file
 * @returns {string[]} the lines
 */
function readLines(file) {
  const data = fs.readFileSync(path.resolve(file), { encoding: 'utf-8' });
  return data.split(/\r?\n/);
}

const VALID_OPTIONS = [
  'n', // add line numbers
  'l', // print file names where pattern is found
  'i', // ignore case
  'v', // reverse files results
  'x', // match entire line
];

const ARGS = process.argv;

// This file should *not* export a function. Use ARGS to determine what to grep
// and use console.log(output) to write to the standard output.

let lineNumbers = false;
let fileNames = false;
let caseInsensitive = false;
let invert = false;
let entireLine = false;
let pattern = undefined;
let files = [];

for (let i = 2; i < ARGS.length; i++) {
  if (ARGS[i].startsWith('-')) {
    const flag = ARGS[i].slice(1).toLowerCase();
    if (VALID_OPTIONS.indexOf(flag) === -1) {
      console.error("Can't recognize %s flag", flag);
      exit(1);
    }

    switch (flag) {
      case 'n':
        lineNumbers = true;
        break;
      case 'l':
        fileNames = true;
        break;
      case 'i':
        caseInsensitive = true;
        break;
      case 'v':
        invert = true;
        break;
      case 'x':
        entireLine = true;
        break;
    }
  } else if (pattern === undefined) {
    pattern = ARGS[i];
  } else {
    files.push(ARGS[i]);
  }
}

for (const file of files) {
  const data = readLines(file);
  let prefix = files.length > 1 ? `${file}:` : '';
  for (let i = 0; i < data.length; i++) {
    const testString = caseInsensitive ? data[i].toLowerCase() : data[i];
    const testPattern = caseInsensitive ? pattern.toLowerCase() : pattern;
    const matchCondition = invert ? false : true;
    let isMatch = false;
    if (entireLine) {
      isMatch = (testString === testPattern) === matchCondition;
    } else {
      isMatch = testString.includes(testPattern) === matchCondition;
    }
    if (!isMatch) continue;
    if (fileNames) {
      console.log(file);
      break;
    } else if (lineNumbers) {
      console.log(`${prefix}${i + 1}:${data[i]}`);
    } else {
      console.log(`${prefix}${data[i]}`);
    }
  }
}
