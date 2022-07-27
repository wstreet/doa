const pkg = require("../../package.json");

exports.register = (program) => {
  program.version(`${pkg.name}@${pkg.version}`, '-v, --version');
};
