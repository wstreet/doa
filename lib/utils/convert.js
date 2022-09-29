// const Metalsmith = require('metalsmith');
// const Handlebars = require('handlebars');
const path = require("path");

module.exports = async (answers = {}) => {
  if (!answers.sourceDir) {
    return Promise.reject(new Error(`无效的资源：${source}`));
  }
  const destination = path.join(process.cwd(), answers.name);
};
