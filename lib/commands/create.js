const chalk = require("chalk");
const inquirer = require("inquirer");
const config = require("../config");
const templates = config.get("templates");

const action = async (name, options) => {
  const questions = [
    {
      type: "input",
      name: "name",
      message: chalk.green("Please enter your project name"),
      validate: (value) => {
        return !!value;
      },
      default: name || "app",
      when: (answers) => {
        if (name) {
          answers.name = name;
          return;
        }
        return !name;
      },
    },
    {
      type: "list",
      message: chalk.green("Please select a template"),
      name: "template",
      choices: ["templates"],
      filter: (value) => {
        return value.toLowerCase();
      },
      when: function (answers) {
        if (options.template) {
          answers.template = options.template;
        }
        return !options.template;
      },
    },
  ];

  const data = await inquirer.prompt(questions);
};

exports.register = (program) => {
  program
    .command("create [name]")
    .description("Create a project use template")
    .option("-t --template [value]", "Select a template")
    .action(action);
};
