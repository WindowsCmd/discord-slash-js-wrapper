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

    return await this.fetch(url, command.command, 'post');
  }

  async setCommand(command) {
    let url = `https://discord.com/api/v8/applications/${this.appId}/commands`;

    return await this.fetch(url, command.command, 'post');
  }

  async getAllCommands(){
    let url = `https://discord.com/api/v8/applications/${this.appId}/commands`;
    let res = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bot " + this.token,
      }
    })
    .catch((error) => {
      if (error.response) {
        throw new Error(JSON.stringify(error.response.data));
      }
    });
    
    return await res.data;
  }

  async deleteCommand(id){
    if(!id){
      throw new Error("[SlashJS Client] No ID provided")
    }

    let url = `https://discord.com/api/v8/applications/${this.appId}/commands/${id}`;

    return await this.fetch(url, null, 'DELETE');
  }

  
  async fetch(endpoint, body, method){
    let res = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bot " + this.token,
      },
      method: method,
      url: endpoint,
      data: body
    })
    .catch((error) => {
      if (error.response) {
        throw new Error(JSON.stringify(error.response.data));
      }
    });

    return res.data;
  }




};
