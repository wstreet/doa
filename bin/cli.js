#!/usr/bin/env node
'use strict';


const pkg = require('../package.json');
const debug = require('../lib/debug')(pkg.name);
const argv = require('../lib/parse_argv')();

const action = argv.args[0];

const extendsMethd = {
  doc: 1,
  // ...
};

debug('%s', action);


if (extendsMethd[action]) {
  require('../lib/' + action);
}
