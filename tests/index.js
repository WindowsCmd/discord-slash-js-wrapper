const optionBuilder = require("../src/util/options");
const Command = require("../src/util/command");
const OptionsBuilder = require("../src/util/options");
const Client = require("../src/index");

const client = new Client(
  "NzMyNzgzMjk3ODcyMDAzMTE0.Xw5noA.F40dTsoNw9Wkr42RvdxSEpJ5NXE",
  "732783297872003114"
);

const option = new OptionsBuilder()
  .name("Cool")
  .description("Cool Description")
  .required(true)
  .type(3);

const command = new Command()
  .name("lul")
  .description("just a test command");

(async () => {

 // console.log(await client.deleteCommand('788595755996020786'));
  console.log(await client.getAllCommands());
})();


