var Discord = require("discord.js");
class Map {
  constructor(Bot, Config, Collector) {
    this.name = "map";
    this.usage = "c!map";
    this.description = "Fetches the latest cube image from [@siloxleaks](https://twitter.com/siloxleaks).";
    this.example = "c!map";
    this.collector = Collector;
    this.guild = false;
    this.permissions = [];
  }
  commandMethod(cmdArgs, msgObj, self) {
    const embed = new Discord.RichEmbed()
    .setTitle("Fetched Most Up-To-Date Map Image")
    .setColor(0x1d72f1)
    .setImage(`https://itsfiremonkey.github.io/assets/images/cubemap.png?v=${Date.now()}`)
    .setFooter('Credits to : @siloxleaks')
    .setTimestamp()
    msgObj.reply({embed}).catch(void(0));
  }
}
module.exports = Map;
