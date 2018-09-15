var Discord = require("discord.js");
class Time {
  constructor(Bot, Config, Collector) {
    this.name = "time";
    this.usage = "c!time";
    this.description = "Gives you the time left before I move.";
    this.example = "c!time";
    this.collector = Collector;
    this.guild = false;
    this.permissions = [];
  }
  replaceNumb(text) {
    text = String(text).split('');
    if(text.length == 1) text = Array('0', text[0]);
    return text.join('');
    var dict = {
      '1': ":one:",
      '2': ":two:",
      '3': ":three:",
      '4': ":four:",
      '5': ":five:",
      '6': ":six:",
      '7': ":seven:",
      '8': ":eight:",
      '9': ":nine:",
      '0': ":zero:"
    };
    for(var charIndex in text) {
      let char = text[charIndex];
      if(dict[char]) text[charIndex] = dict[char];
    }
    return text.join('');
  }
  commandMethod(cmdArgs, msgObj, self) {
    if(!self.collector.Plugins.Timer.Timer) return;
    let timer = self.collector.Plugins.Timer.Timer;
    //if(!timer.timerActive) return msgObj.channel.send('We\'re still trying to discover the Cube\'s timing.').catch(void(0));;
    if(!timer.timerActive) return msgObj.channel.send('Next movement is unknown.').catch(void(0));;
    let timerArr = timer.getTimer();
    let hourString = timerArr[0] > 0 ? self.replaceNumb(timerArr[0]) + " hours, ":"";
    let minString = timerArr[1] > 0 ? self.replaceNumb(timerArr[1]) + " minutes, ":"";
    let secondString = timerArr[2] >= 0 ? self.replaceNumb(timerArr[2]) + " seconds":"";
    msgObj.reply(hourString + minString + secondString + " left.").catch(err => {});
  }
}
module.exports = Time;
