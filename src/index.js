const axios = require("axios");
const Websocket = require('./Gateway/Websocket');
const { EventEmitter } = require('events');

module.exports = class client extends EventEmitter{
  /**
   * Discord bot token
   * @param {string} token
   * Discord bot token
   *
   * @param {string} appId
   * Your app id
   */
  constructor(token, appId, publicKey) {
    super();
    this.token = token;
    this.appId = appId;
    this.presence = null;
    this.ws = new Websocket(this);
    this.ws.on('ready', (user) => {
      this.emit('ready', this);
    });
    this.ws.on('message',  (intetaction) => this.emit('interaction', intetaction))
    this.ws.connect(this.token);

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

  async respondToInteraction(message, token, id){

    if(!token){
      throw new Error("[SlashJS Client] No responce token provided");
    }

    if(!message.message){ throw new Error("[SlashJS Client] No Message object provided!"); }

    let url = `https://discord.com/api/v8/interactions/${id}/${token}/callback`;
    return await this.fetch(url, {
      type: 4,
      data: message.message
      }, 'POST');
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
