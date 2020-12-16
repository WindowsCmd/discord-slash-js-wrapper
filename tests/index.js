const optionBuilder = require("../src/util/options");
const Command = require("../src/util/command");
const OptionsBuilder = require("../src/util/options");
const Client = require("../src/index");

const client = new Client(
  "NzMyNzgzMjk3ODcyMDAzMTE0.Xw5noA.F40dTsoNw9Wkr42RvdxSEpJ5NXE",
  "732783297872003114"
);

const option = new OptionsBuilder()
  .name("Cool Option")
  .description("Cool Description")
  .required(true)
  .newChoice("Yes", "Poggers");

const command = new Command()
  .name("test")
  .description("just a test command")
  .newOption(option);

client.setCommandGuild("732708260519346217", command);
console.log(command);
