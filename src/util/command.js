"use-strict";
const axios = require("axios");

module.exports = class CommandBuilder extends Client {
  constructor() {
    super();
    this.setup({});
  }

  setup(data) {
    this.command = data.comamnd = {
      name: null,
      description: null,
      options: []
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

  /**
   * Sets the description of the command
   * @param {string} description
   */
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

  /**
   * Creates a new option for the command
   * @param {OptionsBuilder} option
   */
  newOption(option) {
    if (!option.option) {
      throw new Error("[Command Error] Option must be of type OptionsBuilder!");
    }

    this.command.options.push(option.option);
    return this;
  }





  set(guild = null){

    if(!guild){
      let url = `https://discord.com/api/v8/applications/${this.appId}/commands`;

      return await this.fetch(url, this.command, "post");
    } else {
      if (isNaN(guild)) {
        throw new Error("[Guild Commands] Guild ID has to be a number");
      }
      let url = `https://discord.com/api/v8/applications/${this.appId}/guilds/${guild}/commands`;
  
      return await this.fetch(url, this.command, "post");
    }
  }



  async fetch(endpoint, body, method) {
    let res = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bot " + this.token,
      },
      method: method,
      url: endpoint,
      data: body,
    }).catch((error) => {
      if (error.response) {
        throw new Error(JSON.stringify(error.response.data));
      }
    });

    return res.data;
  }
};
