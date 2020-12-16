"use-strict";

module.exports = class CommandBuilder {
  constructor() {
    this.setup({});
  }

  setup(data) {
    this.command = data.comamnd = {
      name: null,
      description: null,
      options: [],
    };
  }

  /**
   * Sets the name of the command
   * @param {string} name
   */
  name(name) {
    if (!name) {
      throw new Error(
        "[Command Error] Command names must not be empty! Please provide a proper command name."
      );
    }

    if (name.length > 32) {
      throw new Error(
        "[Command Error] Command names must not be longer than 32 chars! Please provide a proper command name!"
      );
    }
    this.command.name = name;
    return this;
  }

  description(description) {
    if (!description) {
      throw new Error(
        "[Command Error] Command descriptions must not be empty! Please provide a proper command name."
      );
    }

    if (description.length > 100) {
      throw new Error(
        "[Command Error] Command descriptions must not be longer than 100 chars! Please provide a proper command name!"
      );
    }

    this.command.description = description;
    return this;
  }
};
