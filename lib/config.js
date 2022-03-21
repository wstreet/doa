const pkg = require('../package.json')
const debug = require('debug')(`${pkg.name}:config`);
const path = require('path');
const fs = require('fs');
const cp = require('child_process');
const ini = require('ini');

let root

if (process.platform === 'win32') {
  root = process.env.USERPROFILE || process.env.APPDATA || process.env.TMP || process.env.TEMP;
} else {
  root = process.env.HOME || process.env.TMPDIR || '/tmp';
}

const userconfig = path.join(root, `.${pkg.name}rc`);

if (fs.existsSync(userconfig)) {
  let rcFile;
  try {
    rcFile = ini.parse(fs.readFileSync(userconfig, 'utf-8'));
  } catch (err) {
    console.warn('[%s:config] [WARN] read %s ini format error', pkg.name, userconfig);
  }

 // ...
  
  
 module.exports = {
  cache: path.join(root, `.${pkg.name}`), // cache folder name
  userconfig,
};
}