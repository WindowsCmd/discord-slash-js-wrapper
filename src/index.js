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

    let res = await axios.post(url, {
      headers: { Authorization: `Bot ${this.token}` },
      data: command,
    });
    return res.data;
  }
};
