const path = require("path");
const fsExist = require("./fsExist");
const ncp = require("ncp");

module.exports = async (answers) => {
  let isExist = await fsExist(answers.targetDir);
  if (isExist) {
    return;
  }

  return new Promise((resolve, reject) => {
    ncp(
      answers.sourceDir,
      answers.targetDir,
      {
        clobber: true,
      },
      function (err) {
        if (err) {
          console.error(err);
          reject();
        }
        resolve();
      }
    );
  });
};
