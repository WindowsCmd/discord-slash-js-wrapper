# discord-slash-js-wrapper
A Node.js Discord API Wrapper for Slash commands

Example On Setting a command and getting a list of commands:
```js
const slash = require('DiscordSlash')

const client = new slash.Client(
  "Bot toekn",
  "Client ID"
);

const option = new slash.OptionsBuilder()
  .name("TestOption")
  .description("An Example option")
  .required(true)
  .type(3);

const command = new slash.Command()
  .name("TestCommand")
  .description("just a test command").newOption(option);

(async () => {

  await client.setCommand(command)   
  console.log(await client.getAllCommands());
})();


```