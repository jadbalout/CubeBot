var Discord = require("discord.js");
class Status {
  constructor(Bot, Config, Collector) {
    this.name = "status";
    this.usage = "c!status";
    this.description = "Gives you information about my status.";
    this.example = "c!status";
    //this.status = "I am currently printing the **5th** rune in **Wailing Woods**.";
    this.status = "I am currently moving to my next printing location.";
    this.collector = Collector;
    this.guild = false;
    this.permissions = [];
  }
  commandMethod(cmdArgs, msgObj, self) {
    msgObj.reply(self.status).catch(void(0));
  }
}
module.exports = Status;
