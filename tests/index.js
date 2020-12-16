const Client = require('../src/index');
const OptionsBuilder = require('../src/util/options');
const Command = require('../src/util/command');

const client = new Client(
  "",
  "Client ID",
  "Public-Key"
);

const option = new OptionsBuilder()
  .name("Cool")
  .description("Cool Description")
  .required(true)
  .type(3);

const command = new Command()
  .name("lul")
  .description("just a test command").newOption(option);


client.on('ready', () => {
  console.log("Connected and listining for intentions")
});


client.on('interaction', (data) => {
  console.log(`${data.member.user.username} Sent an interaction of type ${data.data.name}`);
});

(async () => {

 // console.log(await client.deleteCommand('788595755996020786'));
  console.log(await client.getAllCommands());
})();


