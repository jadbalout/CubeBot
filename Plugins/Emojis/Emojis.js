class Emojis {
  constructor(Bot, Config, Collector) {
    this.config = Config;
    this.bot = Bot;
    this.emojis = {};
    this.emojiServers = this.config.emojiServers.split(",");
    for (var serverID of this.emojiServers) {
      if (serverID != '') this.getEmojis(serverID);
    }
    Collector.logger.write(
      `Loaded ${Object.keys(this.emojis).length} emojis.`);
  }
  getEmojis(serverID) {
    for (var emoji of this.bot.guilds.get(serverID).emojis) {
      this.emojis[emoji[1].name] = emoji[1];
    }
  }
}
module.exports = Emojis;
