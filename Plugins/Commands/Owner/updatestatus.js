var Plugins = require("./../../Plugins");
class UpdateStatus {
  constructor(Bot, Config, Collector) {
    this.config = Config;
    this.bot = Bot;
    this.name = "updatestatus";
    this.collector = Collector;
    this.guild = false;
    this.permissions = [];
    this.owner = true;
  }

  commandMethod(cmdArgs, msgObj, self) {
    let sts = self.collector.Plugins.Commands.Cube.status;
    sts.status = cmdArgs.join(' ')
  }
}
module.exports = UpdateStatus;
