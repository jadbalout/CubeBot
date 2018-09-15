const fs = require('fs'),
  Logger = require('./Logger/Logger'),
  Plugins = require('./Plugins/Plugins');
var Collector = {};
Collector.logger = Logger;
process.on('unhandledRejection', (reason) => {
  Collector.logger.write(reason, Collector.logger.ERROR);
  //process.exit(1);
});
try {
  var Discord = require("discord.js");
} catch (e) {
  Collector.logger.write(e.stack, Collector.logger.ERROR);
  Collector.logger.write(process.version, Collector.logger.ERROR);
  Collector.logger.write(
    "Please run npm install and ensure it passes with no errors!", Collector.logger
    .ERROR);
  process.exit();
}
Collector.logger.write("Starting Cube");
Collector.logger.write("Node version: " + process.version);
Collector.logger.write("Discord.js version: " + Discord.version);
// Get config data
try {
  var Config = require("./config.json");
} catch (e) {
  Collector.logger.write("Please create a config.json.\n" + e.stack, Collector.logger
    .ERROR);
  process.exit();
}
var bot = new Discord.Client();
bot.on("ready", function() {
  Collector.logger.write("Logged in! Serving " + bot.users.size + " users | " + bot.guilds.size + " servers");
  bot.user.setPresence({
    game: {
      name: "c!help | Serving " + bot.guilds.size + " servers",
      type: 0
    }
  });
  Collector.PluginClass = new Plugins();
  Collector.Plugins = Collector.PluginClass.loadPlugins(bot, Config,
    Collector);
});
bot.on("disconnected", function() {
  Collector.logger.write("Disconnected!");
  process.exit(1); //exit node.js with an error
});
bot.on("guildCreate", function(guild) {
  Collector.PluginClass.callEvents('guildCreate', guild);
});
bot.on("guildDelete", function(guild) {
  Collector.PluginClass.callEvents('guildDelete', guild);
});
bot.on("message", function(message) {
  Collector.PluginClass.callEvents('message', message);
});
bot.on("guildMemberAdd", function(member) {
  Collector.PluginClass.callEvents('guildMemberAdd', member);
});
bot.on("guildMemberRemove", function(member) {
  Collector.PluginClass.callEvents('guildMemberRemove', member);
});
if (Config.botToken || Config.botToken == "") {
  Collector.logger.write("Logging in with token.");
  bot.login(Config.botToken);
} else {
  Collector.logger.write("Please provide a bot token in config.json");
  process.exit();
}
