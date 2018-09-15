const Discord = require("discord.js");
class Info {
  constructor(Bot, Config, Collector) {
    this.config = Config;
    this.bot = Bot;
    this.name = "info";
    this.description = "Shows information about me.";
    this.collector = Collector;
    this.package = require("../../../package.json");
    this.guild = false;
    this.permissions = [];
  }
  commandMethod(cmdArgs, msgObj, self) {
    const embed = new Discord.RichEmbed()
      .setTitle("Cube")
      .setDescription(`Project by: Jad#3336`)
      .setColor(0x1d72f1)
      .setThumbnail(self.bot.user.displayAvatarURL)
      .addField("Version", self.package.version, true)
      .addField("Invite Me", `[Invite Me](https://discordapp.com/oauth2/authorize?client_id=${
        self.bot.user.id
      }&scope=bot&permissions=${self.config.permissionString})`, true)
      .addField(
        "About Me",
        "Hey! I'm here to notify you about the next movement!",
        true
      )
      .setFooter(
        `Proudly serving ${self.bot.guilds.reduce((count, guild) => count + guild.members.size, 0)} users in ${
          self.bot.guilds.size
        } servers.  |  Type c!help for commands`
      );

    msgObj.channel.send({
      embed
    }).catch(err => {});
  }
}
module.exports = Info;
