const program = require("commander");
const pkg = require("../package.json");
const help = require("./help");

let argv = null;

module.exports = (cmd) => {
  if (!argv) {
    argv = program.option("-v, --version", "show version information");
  }

  if (cmd === "doc") {
    argv.option("-d, --doc", "show documentation");
  }

  argv.on("version", function () {
    debugger
    console.log(
      "%s@%s (%s)%snode@%s (%s)",
      pkg.name,
      pkg.version,
      __filename,
      os.EOL,
      process.version.substring(1),
      process.execPath
    );
  });

  argv.on("--help", function () {
    help(argv);
  });


  argv.parse(process.argv.slice());


  if (!argv.args.length) {
    help(argv);
  }

  return argv;
};
