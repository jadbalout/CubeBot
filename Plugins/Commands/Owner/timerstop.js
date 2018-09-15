var Plugins = require("./../../Plugins");
class TimerStop {
  constructor(Bot, Config, Collector) {
    this.config = Config;
    this.bot = Bot;
    this.name = "timerstop";
    this.collector = Collector;
    this.guild = false;
    this.permissions = [];
    this.owner = true;
  }

  commandMethod(cmdArgs, msgObj, self) {
    let timer = self.collector.Plugins.Timer.Timer;
    timer.timerActive = false;
    if(timer.interval) clearTimeout(timer.interval);
    if(timer.interval2) clearTimeout(timer.interval2);
  }
}
module.exports = TimerStop;
