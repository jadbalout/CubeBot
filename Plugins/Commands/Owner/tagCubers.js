var Plugins = require("./../../Plugins");
class TagCubers {
  constructor(Bot, Config, Collector) {
    this.config = Config;
    this.bot = Bot;
    this.name = "tagcubers";
    this.collector = Collector;
    this.guild = false;
    this.permissions = [];
    this.owner = true;
  }

  commandMethod(cmdArgs, msgObj, self) {
    let str = cmdArgs.join(' ')
    self.bot.guilds.forEach(g => { 
      var myRole = g.roles.find(role => role.name === "Cube Trackers");
      var myChannel = g.channels.find(c => c.name === "cube_bot") || g.channels.find(c => c.id === '483816554895638539') || g.channels.find(c => c.id === '487996901413879818');
      if(myRole && myChannel) {
        myChannel.send(myRole.toString() + ", " + str).catch(err => {});
      }
    });
  }
}
module.exports = TagCubers;
