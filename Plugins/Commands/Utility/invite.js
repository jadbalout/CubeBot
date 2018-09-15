const Discord = require("discord.js");
class Invite {
  constructor(Bot, Config, Collector) {
    this.config = Config;
    this.bot = Bot;
    this.name = "invite";
    this.description = "Invite me to your discord!";
    this.usage = ">invite";
    this.example = ">invite";
    this.events = {
      guildCreate: "handleUpdateGame",
      guildDelete: "handleUpdateGameLeave"
    };
    this.collector = Collector;
    this.guild = false;
    this.permissions = [];
  }
  handleUpdateGame(guild) {
    this.collector.logger.write(
      "Joined new guild(" +
        guild.name +
        ") with " +
        guild.memberCount +
        " users."
    );
    this.bot.user.setPresence({
      game: {
        name: "c!help | Serving " + this.bot.guilds.array().length + " servers",
        type: 0
      }
    });
  }
  handleUpdateGameLeave(guild) {
    this.collector.logger.write(
      "Left guild(" + guild.name + ") with " + guild.memberCount + " users."
    );
    this.bot.user.setPresence({
      game: {
        name: "c!help | Serving " + this.bot.guilds.array().length + " servers",
        type: 0
      }
    });
  }
  commandMethod(cmdArgs, msgObj, self) {
    const embed = new Discord.RichEmbed()
      .setColor(0x1d72f1)
      .addField(
        "Invite Me",
        `[Invite Me](https://discordapp.com/oauth2/authorize?client_id=${
          self.bot.user.id
        }&scope=bot&permissions=${self.config.permissionString})`,
        true
      );

    msgObj.channel
      .send({
        embed
      })
      .catch(err => {});
  }
}

module.exports = Invite;
