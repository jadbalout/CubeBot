var Discord = require("discord.js");
class Image {
  constructor(Bot, Config, Collector) {
    this.name = "image";
    this.usage = "c!image";
    this.description = "Fetches the latest cube image from [fnbr.co](http://fnbr.co/cube).";
    this.example = "c!image";
    this.collector = Collector;
    this.guild = false;
    this.permissions = [];
  }
  commandMethod(cmdArgs, msgObj, self) {
    const embed = new Discord.RichEmbed()
    .setTitle("Fetched Most Up-To-Date Image From : fnbr.co/cube.")
    .setColor(0x1d72f1)
    .setImage(`http://image.fnbr.co/cube.jpg?v=${Date.now()}`)
    .setFooter('Credits to : fnbr.co')
    .setTimestamp()
    msgObj.reply({embed}).catch(void(0));
  }
}
module.exports = Image;
