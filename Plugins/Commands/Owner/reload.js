var Plugins = require("./../../Plugins");
class Reload {
  constructor(Bot, Config, Collector) {
    this.config = Config;
    this.bot = Bot;
    this.name = "reload";
    this.collector = Collector;
    this.guild = false;
    this.permissions = [];
    this.owner = true;
  }

  commandMethod(cmdArgs, msgObj, self) {
    switch (cmdArgs[0]) {
      case "all":
      default:
        let timer = self.collector.Plugins.Timer.Timer;
        if(timer.interval) clearTimeout(timer.interval);
        if(timer.interval2) clearTimeout(timer.interval2);
        self.collector.logger.write("Reloading all plugins...");
        self.collector.PluginClass = new Plugins();
        self.collector.Plugins = self.collector.PluginClass.loadPlugins(
          self.bot,
          self.config,
          self.collector,
          "./Plugins/",
          true
        );
        msgObj.author.send("Reloaded all plugins.").catch(error => {
          if (error == "DiscordAPIError: Cannot send messages to this user")
            msgObj.channel.send(
              "I couldn't DM you. Either you blocked me or you disabled DMs in this server."
            );
        });
        break;
    }
  }
}
module.exports = Reload;
