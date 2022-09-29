const path = require('path')
const { readdirSync } = require('fs')

class Config {
  state = {
    templates: []
  }

  constructor() {
    this.initTemplates()
  }

  initTemplates() {
    const dirs = readdirSync(path.resolve(__dirname, '../templates'))
    this.set('templates', dirs)
  }

  get(key, defaultValue) {
    return this.state[key] || defaultValue;
  }

  set(key, value) {
    return this.state[key] = value;
  }
}

module.exports = new Config()