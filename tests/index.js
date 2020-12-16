const slash = require('DiscordSlash')

const client = new slash.Client(
  "Bot toekn",
  "Client ID"
);

const option = new slash.OptionsBuilder()
  .name("Cool")
  .description("Cool Description")
  .required(true)
  .type(3);

const command = new slash.Command()
  .name("lul")
  .description("just a test command").newOption(option);

(async () => {

 // console.log(await client.deleteCommand('788595755996020786'));
  console.log(await client.getAllCommands());
})();


