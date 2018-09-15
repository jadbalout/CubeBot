var Plugins = require("./../../Plugins");
class UpdateProfile {
  constructor(Bot, Config, Collector) {
    this.config = Config;
    this.bot = Bot;
    this.name = "updateprofile";
    this.collector = Collector;
    this.guild = false;
    this.permissions = [];
    this.owner = true;
  }

  commandMethod(cmdArgs, msgObj, self) {
    self.bot.user.setAvatar(`http://image.fnbr.co/cube.jpg?v=${Date.now()}`);
    msgObj.reply('Profile image updated.');
  }
}
module.exports = UpdateProfile;
