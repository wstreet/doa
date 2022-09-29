const { accessSync, constants } = require("fs");

module.exports = async (path) => {
  try {
    await accessSync(path, constants.R_OK);
    return true;
  } catch (err) {
    return false;
  }
};
