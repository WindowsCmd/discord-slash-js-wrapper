const Client = require("../src/index");
const MessageEmbed = require("../src/util/MessageEmbed");
const Message = require("../src/util/message");

const client = new Client("Token", "ClientID", "Public-Key");

client.on("ready", () => {
  console.log("Connected and listining for intentions");
});

client.on("interaction", (data) => {
  client.respondToInteraction(
    new Message().addEmbed(
      new MessageEmbed()
        .title("discord-slash")
        .description("A discord API wrapper for 'slash' commands")
        .thumbnail(
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F4BcVl0W57a8%2Fmaxresdefault.jpg&f=1&nofb=1"
        )
        .timestamp()
        .author(
          data.member.user.username,
          `https://cdn.discordapp.com/avatars/${data.member.user.id}/${data.member.user.avatar}.png`
        )
        .newField(
          "Get on NPM",
          "https://www.npmjs.com/package/discord-slash",
          false
        )
    ),
    data.token,
    data.id
  );
});
