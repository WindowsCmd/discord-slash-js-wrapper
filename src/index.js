const axios = require("axios");

module.exports = class client {
  /**
   * Discord bot token
   * @param {string} token
   * Discord bot token
   *
   * @param {string} appId
   * Your app id
   */
  constructor(token, appId) {
    this.token = token;
    this.appId = appId;
    this.baseUrl = `https://discord.com/api/v8/applications/${this.appId}/`;
  }

  async setCommandGuild(guildid, command) {
    if (!guildid) {
      throw new Error("[Guild Commands] Guild ID cannot be null!!");
    }
    if (isNaN(guildid)) {
      throw new Error("[Guild Commands] Guild ID has to be a number");
    }
    let url = `https://discord.com/api/v8/applications/${this.appId}/guilds/${guildid}/commands`;
    let res = await axios
      .post(url, command.command, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.token,
        },
      })
      .catch((error) => {
        if (error.response) {
          throw new Error(JSON.stringify(error.response.data));
        }
      });
    return res.data;
  }

  async setCommand(command) {
    let url = `https://discord.com/api/v8/applications/${this.appId}/commands`;
    let res = await axios
      .post(url, command.command, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bot " + this.token,
        },
      })
      .catch((error) => {
        if (error.response) {
          throw new Error(JSON.stringify(error.response.data));
        }
      });
    return res.data;
  }


  async getAllCommands(){
    let url = `https://discord.com/api/v8/applications/${this.appId}/commands`;

    let res = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bot " + this.token,
      },
    })
    .catch((error) => {
      if (error.response) {
        throw new Error(JSON.stringify(error.response.data));
      }
    });

    return res.data;
  }

  async deleteCommand(id){
    if(!id){
      throw new Error("[SlashJS Client]")
    }
  }
};
