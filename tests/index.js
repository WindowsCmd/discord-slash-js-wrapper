const Client = require("../src/index");
const OptionsBuilder = require("../src/util/options");
const Command = require("../src/util/command");
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
        .title("OwO!!")
        .description("This is a cool feature discord... a really cool feature")
        .thumbnail(
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F4BcVl0W57a8%2Fmaxresdefault.jpg&f=1&nofb=1"
        )
        .timestamp()
        .author(
          data.member.user.username,
          `https://cdn.discordapp.com/avatars/${data.member.user.id}/${data.member.user.avatar}.png`
        )
        .newField(
          "yes please",
          "hello there fellow americans it is your president obama!",
          false
        )
    ),
    data.token,
    data.id
  );
});
