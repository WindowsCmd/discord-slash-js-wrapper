"use-strict";

module.exports = class CommandBuilder {
  constructor() {
    this.setup({});
  }

  setup(data) {
    this.command = data.comamnd = {
      name: null,
      description: null,
      options: null,
    };
  }
};
