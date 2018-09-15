class Timer {
  constructor(Bot, Config, Collector) {
    this.config = Config;
    this.bot = Bot;
    this.interval = null;
    this.interval2 = null;
    this.timerActive = true;
    if(this.timerActive) {
      this.setupInterval(this);
    }   
    this.events = {
      guildCreate: "handleCreateChannel"
    };
  }
  handleCreateChannel(guild) {
    var myChannel = guild.channels.find(c => c.name === "cube_bot") || guild.channels.find(c => c.id === '483816554895638539') || guild.channels.find(c => c.id === '487996901413879818');
    if(!myChannel)
      guild.createChannel("cube_bot", "text").catch(err => {});
  }
  getTimer() {
    var secondsI = this.getTimeLeft();
    let hours = Math.floor(secondsI/3600);
    let minutes = Math.floor(secondsI%3600/60);
    let seconds = Math.floor(secondsI-hours*3600-minutes*60);
    return [hours, minutes, seconds];
  }
  getTimeLeft() {
    var a = 1536961749000,
    n = 2187000,
    i = Date.now(Date.UTC(0, 0, 0, 0, 0, 0)) - a,
    o = Math.floor(i / n);
    return ((a + (o + 1) * n) - Date.now(Date.UTC(0, 0, 0, 0, 0, 0)))/1000;
  }
  setupInterval(self) {
    var time = self.getTimeLeft();
    var intervalTiming = 5;
    var timer = time-intervalTiming*60;
    var type = "minutes";
    while(timer < 0) {
      if(time < 60) {
        if(type == "minutes") intervalTiming = 60;
        intervalTiming--;
        type = "seconds";
        timer = time-intervalTiming;
      } else {
        type = "minutes";
        intervalTiming--;
        timer = time-intervalTiming*60;       
      }
    }
    if(intervalTiming == 0) return; 
    self.interval = setTimeout(function() {
      self.announceCube(self, intervalTiming+" "+type);
    }, timer*1000);
    self.interval2 = setTimeout(function() {
      self.setupInterval(self);
    }, time*1000);
  }
  announceCube(self, str) {
    if(!self.timerActive) return;
    self.bot.guilds.forEach(g => { 
      var myRole = g.roles.find(role => role.name === "Cube Trackers");
      var myChannel = g.channels.find(c => c.name === "cube_bot") || g.channels.find(c => c.id === '483816554895638539') || g.channels.find(c => c.id === '487996901413879818');
      if(myRole && myChannel) {
        myChannel.send(myRole.toString() + ", I will move in " + str + "!").catch(err => {});
      }
    });
  }
}
module.exports = Timer;
