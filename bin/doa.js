#!/usr/bin/env node

'use strict';
// require = require('esm')(module);

const program = require("commander");
const commands = require("../lib/commands");

commands.register(program);

program.parse(process.argv);
