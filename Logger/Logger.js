const fs = require('fs'),
    moment = require('moment'),
    colors = require('colors');
var self = {
    LEVELS: {
        LOG: 'LOG',
        INFO: 'INFO',
        WARN: 'WARN',
        ERROR: 'ERROR',
        FATAL: 'FATAL',
        DEBUG: 'DEBUG'
    },
    logError(error, msgObj=undefined) {
      const self = this;
  		fs.appendFile(`Logger/Logs/Error.txt`, '[' + moment().format("MM-D-YY hh:mm:ss") + '] >> ' + error + "\n" + (error.stack  != undefined ? error.stack:'Unknown source.'), (err) => {
    		if(err) return;
        if(msgObj) msgObj.reply('Something went wrong. Please contact an owner ASAP.');
    		self.write('Logged new error.', self.LEVELS.ERROR);
    	});
    },
    write: function(msg, level = this.LEVELS.INFO) {
        if (self.log) {
            if (level == this.LEVELS.LOG) {
                console.log(("[NOTICE]" + " " + msg + " ").cyan);
            } else if (level == this.LEVELS.ERROR) {
                console.log(("[ERROR]" + " " + msg + " ").red);
            } else if (level == this.LEVELS.FATAL) {
                console.log(("[FATAL]" + " " + msg + " ").red);
            } else {
                console.log(("[NOTICE]" + " " + msg + " ").cyan);
            }
        }
    },
    log: true
};
module.exports = self;
