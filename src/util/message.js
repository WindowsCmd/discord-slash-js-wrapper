"use-strict";

module.exports = class WSMessage {
  constructor() {
    this.setup({});
  }

  setup(data) {
    this.message = data.message = {
      content: null,
      tts: false,
      embeds: [],
    };
  }

  /**
   * Sets the content of the message
   * @param {string} content
   */
  content(content) {
    if (!content) {
      throw new Error(
        "[Command Error] Command names must not be empty! Please provide a proper command name."
      );
    }

    if (content.length > 2000) {
      throw new Error(
        "[Command Error] message content must not be longer than 2000 chars!"
      );
    }
    this.message.content = content;
    return this;
  }

  addEmbed(embed) {
    if (!embed.embed) {
      throw new Error("[Command Error] Embeds must be of type MessageEmbed");
    }

    this.message.embeds.push(embed.embed);
    return this;
  }
};
