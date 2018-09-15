class Commands {
  constructor(Bot, Config, Collector) {
    this.config = Config;
    this.bot = Bot;
    this.commands = undefined;
    this.collector = Collector;
    this.database = this.collector.Database;
    this.events = {
      message: "handleProcessCommand"
    };
    this.owners = Config.owners.split(",");
    this.prefixes = {}; // {guildId:prefix}
    this.disabledCommands = {}; //{guildId:['help', 'ping']}
    this.owners = this.config.owners.split(",");
  }
  refreshPrefix(guildId, req, res) {
    if (!this.prefixes[guildId])
      return res.send(
        JSON.stringify({
          error: true,
          message:
            "The server is still not in our records. Prefix will be saved once we receive a message from this server."
        })
      );
    this.database
      .getGuildColumn(guildId, "Prefix")
      .then(result => {
        this.prefixes[guildId] = result.Prefix;
        return res.send({ success: true });
      })
      .catch(err => {
        return res.send({ error: true, message: err.message });
      });
  }
  refreshDisabledCommands(guildId, req, res) {
    if (!this.disabledCommands[guildId])
      return res.send(
        JSON.stringify({
          error: true,
          message:
            "The server is still not in our records. The disabled commands will be saved once we receive a message from this server."
        })
      );
    this.database
      .getGuildColumn(guildId, "DisabledCommands")
      .then(result => {
        if (result.DisabledCommands == null) result.DisabledCommands = "";
        this.disabledCommands[guildId] = result.DisabledCommands.split(",");
        return res.send({ success: true });
      })
      .catch(err => {
        return res.send({ error: true, message: err.message });
      });
  }
  wrongUsage(msgObj, pluginClass) {
    var usage = pluginClass.usage,
      description = pluginClass.description,
      example = pluginClass.example,
      message =
        "```\n" +
        usage +
        "\n\n" +
        description +
        "\n\nExample: " +
        example +
        "```";
    msgObj.channel.send(message);
  }

  getMethod(commandName, dictionary = this.collector.Plugins["Commands"]) {
    for (var pluginIndex in dictionary) {
      if (dictionary[pluginIndex].name == commandName) {
        return {
          method: dictionary[pluginIndex].commandMethod,
          class: dictionary[pluginIndex]
        };
      } else {
        if (dictionary[pluginIndex].type == "folder") {
          var getMethodSub = this.getMethod(
            commandName,
            dictionary[pluginIndex]
          );
          if (getMethodSub != undefined) return getMethodSub;
        }
      }
    }
    return undefined;
  }
  processCmd(msgObj) {
    var prefix = this.config.defaultPrefix;
    const firstChar = msgObj.content.substring(0, prefix.length);
    if (firstChar != prefix) return;
    var commandArgs = msgObj.content.split(" "),
      commandName = commandArgs[0].slice(prefix.length).toLowerCase();
    let methodName = this.getMethod(commandName);
    if (methodName == undefined) return;
    if (methodName.guild == true && !msgObj.guild) return;
    if (methodName.owner == true && this.owners.indexOf(msgObj.author.id) == -1)
      return msgObj.reply("Only the bot owners can use that command.").catch(void(0));
    if (methodName.permissions && methodName.guild) {
      for (var permission of methodName.permissions) {
        if (!msgObj.guild.me.permissions.has(permission))
          return msgObj.reply(
            "I need the `" + permission + "` permission to use that command."
          ).catch(void(0));
      }
    }
    commandArgs.splice(0, 1);
    if (typeof methodName["method"] == "function")
      methodName["method"](commandArgs, msgObj, methodName["class"]);
  }
  handleProcessCommand(msgObj) {
    if (this.commands == undefined)
      this.commands = this.collector.Plugins["Commands"];
    this.processCmd(msgObj);
  }
}
module.exports = Commands;
