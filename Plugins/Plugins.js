var fs = require('fs'),
  path = require('path');
class Plugin {
  loadPlugins(bot, Config, Collector, pluginDir = './Plugins/', reload = false) {
    this.bot = bot;
    this.Config = Config;
    this.Collector = Collector;
    this.plugins = {};
    this.events = {};
    this.loadDir(pluginDir, reload);
    return this.plugins;
  }

  readEvents(plugin) {
    for (var event in plugin.events) {
      if (!this.events[event]) this.events[event] = [];
      this.events[event].push({
        'plugin': plugin,
        'callback': plugin.events[event]
      });
    }
  }

  callEvents(event, args) {
    if (!this.events[event] || this.events[event].length == 0)
      return;
    for (let pluginEvent of this.events[event]) {
      let pluginClass = pluginEvent['plugin'],
        pluginCallback = pluginEvent['callback'];
      pluginClass[pluginCallback](args);
    }
  }

  loadDir(dir, reload) {
    let pluginFolders = fs.readdirSync(dir).filter(file => fs.statSync(path.join(
      dir, file)).isDirectory());
    for (let folderName of pluginFolders) {
      var pluginPath = dir + folderName;
      let pluginFiles = fs.readdirSync(pluginPath).filter(file => fs.statSync(
        path.join(pluginPath, file)).isFile());
      for (var i = 0; i < pluginFiles.length; i++) {
        if (reload) delete require.cache[String(__dirname + '/' + String('' +
          pluginPath + '\\' + pluginFiles[i]).replace('./Plugins/', '')).replace(
          new RegExp('/', 'g'), '\\')];
        if(pluginFiles[i].split('.js').length > 1)
          var obj = require(String('./' + pluginPath + '/' + pluginFiles[i]).replace(
            './Plugins/', ''));
        var arr = pluginPath.replace('./Plugins/', '').split('/');
        var lastPluginValue = this.plugins;
        for (var index in arr) {
          if (index != arr.length) {
            if (!lastPluginValue[arr[index]]) {
              lastPluginValue[arr[index]] = {
                'type': 'folder'
              };
            }
          }
          lastPluginValue = lastPluginValue[arr[index]];
        }
        if(pluginFiles[i].split('.js').length > 1) {
          lastPluginValue[pluginFiles[i].split('.js')[0]] = new obj(this.bot,
            this.Config, this.Collector);
          this.readEvents(lastPluginValue[pluginFiles[i].split('.js')[0]]);
        }
      }
      this.loadDir(pluginPath + '/', reload);
    }
  }
};
module.exports = Plugin;
