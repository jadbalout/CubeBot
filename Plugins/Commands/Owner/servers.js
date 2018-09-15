var Discord = require("discord.js");
class Servers {
  constructor(Bot, Config, Collector) {
    this.bot = Bot;
    this.name = "servers";
    this.guild = false;
    this.permissions = [];
    this.owner = true;
  }
  commandMethod(cmdArgs, msgObj, self) {
    msgObj.author
      .send(
        `__**Cube is currently on the following servers:**__ \n${self.bot.guilds
          .map(g => `${g.name} - ** ${g.memberCount} Members ** `)
          .join(`\n`)}`,
        {
          split: true
        }).then(function() {
          if (msgObj.guild)
            msgObj.channel.send(":mailbox_with_mail: Check your DM.");
        })
      .catch(error => {
        if (error == "DiscordAPIError: Cannot send messages to this user")
          msgObj.channel.send(
            "I couldn't DM you. Either you blocked me or you disabled DMs in this server."
          );
      });
  }
}
module.exports = Servers;
