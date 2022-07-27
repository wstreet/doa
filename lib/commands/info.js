"use strict";
const chalk = require("chalk");
const envinfo = require("envinfo");

const action = async () => {
  const info = await envinfo.run(
    {
      System: ["OS", "Shell"],
      Binaries: ["Node", "Yarn", "npm"],
      Languages: ["Bash", "Go", "Rust"],
      Utilities: ["Git"],
    },
    {
      title: "Environment info",
    }
  );
  console.log(chalk.green(info));
};

exports.register = (program) => {
  program.command("info").description("view the environment").action(action);
};
