/**
 * Require all project dependecies
 * @param  {String} path
 * @param  {Function} cb
 * @return {void}
 */
var fs   = require('fs'),
    path = require("path");

function AutoLoad() {
    //Require all controllers
    bootstrap('/../app/controllers');

    function bootstrap(_path, cb) {
       var fullPath = __dirname + _path;
       fs.readdir(fullPath, function(err, files){
           if (err) throw err;
           files
            .filter(function(file) { return file.substr(-3) === '.js'; })
            .forEach(function(file) {
                var name = file.replace('.js', '');
                if(name == 'AppController')
                    return;

                controller = path.normalize(fullPath + "/" + name);
                require(controller);
            });
       });
    }
}

module.exports = new AutoLoad();
