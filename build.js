var https = require('https');
var fs = require('fs');
var cp = require('child_process');

var url = "https://raw.githubusercontent.com/izy521/discord.io/master/lib/index.js";
var file = "discordio.js";
var conf = "conf.json";
var dest = "./docs";

https.get(url, function(res) {
    var pipe = res.pipe(fs.createWriteStream(__dirname + '/' + file));

    pipe.on('finish', function() {
        cp.execSync(["jsdoc",
            "-c", conf,
            "-d", dest,
            file].join(" "));
        
        fs.unlink(__dirname + '/' + file);
    });
}).on('error', function(err) {
    throw err;
});