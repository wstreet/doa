const chalk = require("chalk");
const inquirer = require("inquirer");
const config = require("../config");
const path = require("path");
const download = require('../../utils/download');
// const templates = config.get("templates");

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
      message: function (answers) {
        return chalk.red.bold(`${answers.name} 已经存在! 您确定还要继续吗?`);
      },
      choices: ["继续", "取消"],
      name: "projectNameConfirm",
      when: async function (answers) {
        answers.name = name || answers.name;
        const targetFolder = path.join(process.cwd(), answers.name);
        return fsExists(targetFolder);
      },
      filter: (val) => {
        if (val == "取消") {
          process.exit(0);
        }
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
  const tasks = [
    {
      title: '下载项目',
      task: async (ctx) => {
        answers.templatePath = path.join(process.cwd(), `.${answers.name}`);

        const templateTargetDirectory = await download(answers);

        if (templateTargetDirectory) {
          ctx.templateTargetDirectory = templateTargetDirectory;
        }
        else {
          console.error(chalk.red.bold('下载项目失败'));
          process.exit(1);
        }

      },
    },
    {
      title: '生成代码',
      task: (ctx) => convert(answers, ctx.templateTargetDirectory)
    },
  ];

};

exports.register = (program) => {
  program
    .command("create [name]")
    .description("Create a project use template")
    .option("-t --template [value]", "Select a template")
    .action(action);
};
