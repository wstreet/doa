const download = require('download-git-repo');

//下载代码模板
module.exports = async (answers) => {
  return new Promise((resolve, reject) => {
    try {
      download(`direct:https://github.com/wstreet/${answers.template}.git`, answers.templatePath, { clone: true }, (err) => {
        if (!err) {
          resolve(answers.templatePath);
        } else {
          reject(err);
        }
      })
    } catch (error) {
      reject(error);
    }

  });
}
