'use strict';

const commands = [
  require('./version'),
  require('./info'),
  require('./create'),
]

exports.register = (program) => {
  commands.forEach(command => command.register(program));
}