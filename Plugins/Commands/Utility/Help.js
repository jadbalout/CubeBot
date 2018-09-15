class Help {
  constructor(Bot, Config, Collector) {
    this.config = Config;
    this.bot = Bot;
    this.collector = Collector;
    this.name = "help";
    this.description = "Gives all commands available.";
    this.fieldLimit = 25;
    this.fieldTotalLimit = 6000;
    this.Discord = require("discord.js");
    this.guild = false;
    this.permissions = [];
  }
  commandMethod(cmdArgs, msgObj, self) {
    if (cmdArgs[0] != undefined) {
      var command = self.getCommand(cmdArgs[0]);
      if (command == false) {
        const embed = new self.Discord.RichEmbed()
          .setColor(0xab1f1f)
          .addField(
            "Error :negative_squared_cross_mark:",
            `No command called "${cmdArgs[0]}" found`
          );
        msgObj.channel.send({ embed }).catch(err => {});
      } else
        return self.collector.Plugins.Commands.Commands.wrongUsage(
          msgObj,
          command
        );
      return;
    }
    const embed = new self.Discord.RichEmbed().setColor(0x1d72f1);
    var commands = self.getCommands();
    var totalChars = 0;
    for (var folderName in commands) {
      var commandFolder = commands[folderName];
      var field = "";
      for (var commandIndex in commandFolder) {
        var command = commandFolder[commandIndex];
        field += `${self.config.defaultPrefix}${command.name} - ${
          command.description
        } \n`;
      }
      if (totalChars < 6000) totalChars += field.length;
      if (totalChars < 6000) {
        if (field != "" && field.length < 1024) {
          embed.addField(folderName, field);
          delete commands[folderName];
        }
      } else self.createEmbed(msgObj, commands);
    }
    msgObj.channel.send({ embed }).catch(err => {});
  }

  createEmbed(msgObj, commands) {
    const embed = new self.Discord.RichEmbed().setColor(0x1d72f1);
    var totalChars = 0;
    for (var folderName in commands) {
      var commandFolder = commands[folderName];
      var field = "";
      for (var commandIndex in commandFolder) {
        var command = commandFolder[commandIndex];
        field += `${self.config.defaultPrefix}${command.name} - ${
          command.description
        } \n`;
      }
      if (totalChars < 6000) totalChars += field.length;
      if (totalChars < 6000) {
        if (field != "" && field.length < 1024) {
          embed.addField(folderName, field);
          delete commands[folderName];
        }
      } else this.createEmbed(msgObj, commands);
    }
    msgObj.channel.send({ embed }).catch(err => {});
  }

  getCommand(command) {
    var commandArr = this.collector.Plugins.Commands;
    for (var pluginIndex in commandArr) {
      if (commandArr[pluginIndex].type == "folder") {
        var cmd = this.readTheFolderFor(commandArr[pluginIndex], command);
        if (cmd != false) return cmd;
      }
    }
    return false;
  }
  readTheFolderFor(folder, cmd) {
    for (var pluginIndex in folder)
      if (folder[pluginIndex].name == cmd) return folder[pluginIndex];
    return false;
  }
  readFolder(folder) {
    var arr = [];
    for (var pluginIndex in folder) {
      if (
        folder[pluginIndex].description != undefined &&
        folder[pluginIndex].name != undefined
      ) {
        arr.push(folder[pluginIndex]);
      }
    }
    return arr;
  }

  getCommands() {
    var commandArr = this.collector.Plugins.Commands;
    var arr = {};
    for (var pluginIndex in commandArr) {
      if (commandArr[pluginIndex].type == "folder") {
        var pluginArr = this.readFolder(commandArr[pluginIndex]);
        arr[pluginIndex] = pluginArr;
      }
    }
    return arr;
  }
}
module.exports = Help;
