const chalk = require("chalk");
const inquirer = require("inquirer");
const Listr = require("listr");
const path = require("path");
const config = require("../config");
// const download = require('../utils/download');
const fsExist = require("../utils/fsExist");
const copyTemplate = require("../utils/copyTemplate");
const convert = require("../utils/convert");

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
        return fsExist(targetFolder);
      },
      filter: (val) => {
        if (val === "取消") {
          process.exit(0);
        }
      },
    },
    {
      type: "list",
      message: chalk.green("Please select a template"),
      name: "template",
      choices: config.get("templates"),
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
  data.sourceDir = path.resolve(__dirname, `../../templates/${data.template}`);
  data.targetDir = path.join(process.cwd(), `./${data.name}`);		
  // TODO： 合二为一，直接从模版文件转化到{name}文件夹
		const tasks = [
			{
				title: "载入资源",
				task: async (ctx) => {
					await copyTemplate(data);
				},
			},
			{
				title: "生成代码",
				task: (ctx) => convert(data),
			},
		];
  const listrInstance = new Listr(tasks);
  await listrInstance.run();
};

exports.register = (program) => {
  program
    .command("create [name]")
    .description("Create a project use template")
    .option("-t --template [value]", "Select a template")
    .action(action);
};
