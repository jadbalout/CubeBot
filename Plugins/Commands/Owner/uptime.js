class Uptime {
  constructor(Bot, Config, Collector) {
    this.name = "uptime";
    this.collector = Collector;
    this.startTime = Date.now();
    this.guild = false;
    this.permissions = [];
    this.owner = true;
  }
  commandMethod(cmdArgs, msgObj, self) {
    var now = Date.now();
    var msec = now - self.startTime;

    var days = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= days * 1000 * 60 * 60 * 24;
    var hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    var mins = Math.floor(msec / 1000 / 60);
    msec -= mins * 1000 * 60;
    var secs = Math.floor(msec / 1000);
    var timestr = "";

    if (days > 0) timestr += days + " days ";
    if (hours > 0) timestr += hours + " hours ";
    if (mins > 0) timestr += mins + " minutes ";
    if (secs > 0) timestr += secs + " seconds ";

    msgObj.channel.send("**Uptime**: " + timestr);
  }
}
module.exports = Uptime;
