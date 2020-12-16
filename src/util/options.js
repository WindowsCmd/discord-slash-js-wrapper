"use-strict";

module.exports = class OptionsBuilder {
  constructor() {
    this.setup({});
  }

  setup(data) {
    this.option = data.options = {
      name: null,
      description: null,
      type: null,
      required: null,
      choices: [],
      options: []
    };
  }

  /**
   * The name of the option
   * @param {string} name
   */
  name(name) {
    if (!name) {
      throw new Error(
        "[Options Error] Option names must not be empty! Please provide a proper Option name."
      );
    }

    if (name.length > 32) {
      throw new Error(
        "[Options Error] Option names must not be longer than 32 chars! Please provide a proper Option name!"
      );
    }
    this.option.name = name;
    return this;
  }

  /**
   * The description of the option
   * @param {string} description
   */
  description(description) {
    if (!description) {
      throw new Error(
        "[Options Error] Option descriptions must not be empty! Please provide a proper Option description."
      );
    }

    if (description.length > 100) {
      throw new Error(
        "[Options Error] Option descriptions must not be longer than 100 chars! Please provide a proper Option description!"
      );
    }

    this.option.description = description;
    return this;
  }

  /**
   * If the command is required
   * @param {bool} required
   * @default null
   */
  required(required) {
    if (required == null) {
      throw new Error("[Options Error] Required must not be null!");
    }
    this.option.required = required;
    return this;
  }

  /**
   * New command choice
   * @param {string} name
   * @param {string || int} value
   */
  newChoice(name, value) {
    if (!name) {
      throw new Error("[Options Error] Choice name must not be null!");
    }
    if (!value) {
      throw new Error("[Options Error] Choice value must not be null!");
    }

    this.option.choices.push({ name: name, value: value });
    return this;
  }

  /**
   * Command option type Learn more here: https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype
   * @param {int} type
   */
  type(type) {
    if (!type) {
      throw new Error("[Options Error] Type must not be null");
    }
    this.option.type = type;
    return this;
  }

  /**
   * For a nested option
   * @param {OptionsBuilder} option 
   */
  newOption(option) {
    if (!option.option) {
      throw new Error("[Command Error] Option must be of type OptionsBuilder!");
    }

    this.command.options.push(option.option);
    return this;
  }
};
