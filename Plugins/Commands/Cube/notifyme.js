var Discord = require("discord.js");
class NotifyMe {
  constructor(Bot, Config, Collector) {
    this.name = "notifyme";
    this.usage = "c!notifyme";
    this.description = "Notifies you when I'm about to move.";
    this.example = "c!notifyme";
    this.collector = Collector;
    this.guild = true;
    this.permissions = [];
  }
  
  createRoleAndAdd(GuildMember, msgObj, self) {
    msgObj.guild
      .createRole({
        name: "Cube Trackers",
        color: "WHITE",
        hoist: false,
        mentionable: true,
        permissions: []
      })
      .then(role => {
        GuildMember.addRole(role).catch(e => {
          if (e.code == 50013)
            return msgObj.reply("I am not allowed to add a role to that user.").catch(err => {});
          else
            return msgObj.reply(
              "I got an unexpected error, please report this to my owners: " +
                e.message +
                ":::" +
                e.code
            ).catch(err => {});
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  commandMethod(cmdArgs, msgObj, self) {
    if(!msgObj.guild || msgObj.guild == null) return;
    if (!msgObj.guild.me.permissions.has("MANAGE_ROLES"))
      return msgObj.reply("I am not allowed to give roles. Please use another bot such as Dyno to get the `Cube Trackers` role.").catch(void(0));
    let GuildMember = msgObj.guild.members.get(msgObj.author.id);
    var myRole = msgObj.guild.roles.find(role => role.name === "Cube Trackers");
    if (!myRole && cmdArgs[0] == "delete") return;
    if ((myRole == undefined || myRole == null) && cmdArgs[0] == "add")
      return self.createRoleAndAdd(GuildMember, msgObj, self);
    if (!GuildMember.roles.has(myRole.id)) {
      GuildMember.addRole(myRole)
        .then(() => {
          msgObj.reply(
            "Success! I will notify you soon! Use `c!notifyme` to undo."
          ).catch(err => {});
        })
        .catch(e => {
          if (e.code == 50013)
            return msgObj.reply("I am not allowed to add a role.").catch(err => {});
          else
            return msgObj.reply(
              "I got an unexpected error, please report this to my owners: " +
                e.message +
                ":::" +
                e.code
            ).catch(err => {});
        });
    } else {
      GuildMember.removeRole(myRole)
        .then(() => {
          msgObj.reply(
            "Removed you from my list. Use `c!notifyme` to undo."
          ).catch(err => {});
        })
        .catch(e => {
          if (e.code == 50013)
            return msgObj.reply("I am not allowed to remove a role.").catch(err => {});
          else
            return msgObj.reply(
              "I got an unexpected error, please report this to my owners: " +
                e.message +
                ":::" +
                e.code
            ).catch(err => {});
        });
    }
  }
}
module.exports = NotifyMe;
