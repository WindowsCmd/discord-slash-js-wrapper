module.exports = class EmbedBuilder {
  /**
   * @constructor
   */
  constructor() {
    this.setup({});
  }

  setup(data) {
    this.embed = data.embed = {
      title: null,
      author: null,
      color: null,
      description: null,
      thumbnail: null,
      fields: [],
      image: null,
      footer: null,
      timestamp: null,
    };
  }

  /**
   * Sets the title of the embed.
   * @param {string} title The title
   * @returns {EmbedBuilder} This Embed
   */
  title(title) {
    if (!title) {
      throw new Error(
        "[Embed Error] Embed Titles can not be Empty, Please provide a proper title string."
      );
    }
    if (title.length > 256) {
      throw new Error(
        "[Embed Error] Embed Titles can not exceed a maximum of 256 Characters."
      );
    }
    this.embed.title = title;
    return this;
  }

  description(description) {
    if (!description) {
      throw new Error(
        "[Embed Error] Embed Descriptions can not be Empty, Please provide a proper description string."
      );
    }
    if (description.length > 2048) {
      throw new Error(
        "[Embed Error] Embed Descriptions can not exceed a maximum of 2048 Characters."
      );
    }
    this.embed.description = description;
    return this;
  }

  image(imageURL) {
    if (!imageURL) {
      throw new Error(
        '[Embed Error] No Image URL was provided for the "newImage" field, Please provide a proper Image URL'
      );
    }
    this.embed.image = {
      url: imageURL,
    };
    return this;
  }

  thumbnail(imageURL) {
    if (!imageURL) {
      throw new Error(
        '[Embed Error] No Image URL was provided for the "newThumbnail" field, Please provide a proper Image URL'
      );
    }
    this.embed.thumbnail = {
      url: imageURL,
    };
    return this;
  }

  footer(text, iconURL) {
    if (!text) {
      throw new Error(
        "[Embed Error] No Footer Text was provided, Please provide a proper Footer Text string."
      );
    }
    if (text.length > 2048) {
      throw new Error(
        "[Embed Error] Footer Text can not exceed a maximum of 2048 Characters."
      );
    }
    if (!iconURL) {
      throw new Error(
        "[Embed Error] No Footer Image/Icon URL was provided, Please provide a proper Image/Icon URL"
      );
    }
    this.embed.footer = {
      text: text,
      icon_url: iconURL,
    };
    return this;
  }

  timestamp() {
    this.embed.timestamp = new Date();
    return this;
  }

  color(color) {
    if (!color) {
      throw new Error(
        "[Embed Error] No Embed Color was provided, Please provide a proper Embed Color string."
      );
    }
    this.embed.color = color;
    return this;
  }
  author(name, iconURL) {
    if (!name) {
      throw new Error(
        "[Embed Error] No Author Name was provided, Please provide a proper Author Name string."
      );
    }
    if (name.length > 256) {
      throw new Error(
        "[Embed Error] Embed Author Name can not exceed a maximum of 256 Characters."
      );
    }
    if (!iconURL) {
      throw new Error(
        "[Embed Error] No Author Image/Icon URL was provided, Please provide a proper Image/Icon URL"
      );
    }
    this.embed.author = {
      name: name,
      icon_url: iconURL,
    };
    return this;
  }
  newField(name, value, inline = false) {
    if (!name) {
      throw new Error(
        "[Embed Error] No Field Name was provided, Please provide a proper Field Name string."
      );
    }
    if (name.length > 256) {
      throw new Error(
        "[Embed Error] Embed Field Names can not exceed a maximum of 256 Characters."
      );
    }
    if (!value) {
      throw new Error(
        "[Embed Error] Embed Field Values can not be Empty!, Please provide a proper Value to add to the Field."
      );
    }
    if (value.length > 1024) {
      throw new Error(
        "[Embed Error] Embed Field Values can not exceed a maximum of 1024 Characters,"
      );
    }
    if (this.embed.fields.length > 25) {
      throw new Error(
        "[Embed Error] Embeds can only include a maximum of 25 Embed Fields."
      );
    }
    this.embed.fields.push({
      name,
      value,
      inline: inline ? true : false,
    });
    return this;
  }
};
