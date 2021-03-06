# discord-slash-js-wrapper

PLEASE NOTE: This wrapper is still in early alpha

A Node.js Discord API Wrapper for Slash commands

Example on responding to a command:

```js
const { Client, MessageEmbed, Message } = require("discord-slash");

const client = new Client("Token", "ClientID");

client.once("ready", () => {
  console.log("Connected and listening for interactions");
});

client.on("interaction", (data) => {
  client.respondToInteraction(
    new Message().addEmbed(
      new MessageEmbed()
        .title("discord-slash")
        .description("A discord API wrapper for 'slash' commands")
        .thumbnail(
          "https://i.ytimg.com/vi/4BcVl0W57a8/maxresdefault.jpg"
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
```

Example On Setting a command and getting a list of commands:

```js
const slash = require("discord-slash");

const client = new slash.Client("Bot Token", "Client ID");

const option = new slash.OptionsBuilder()
  .name("TestOption")
  .description("An Example option")
  .required(true)
  .type(3);

const command = new slash.Command()
  .name("TestCommand")
  .description("just a test command")
  .newOption(option);

(async () => {
  await client.setCommand(command);
  console.log(await client.getAllCommands());
})();
```
