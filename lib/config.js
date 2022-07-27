const path = require('path')

class Config {
  state = {
    templates: path.join(__dirname, '../templates')
  }

  constructor() {}

  get(key, defaultValue) {
    return this.state[key] || defaultValue;
  }

  set(key, value) {
    return this.state[key] = value;
  }
}

module.exports = new Config()