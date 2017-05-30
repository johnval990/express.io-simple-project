//.env config
require('dotenv').config();

//Project dependencies
global.app_path = __dirname;
express         = require('express.io')
var app         = global.app = express().http().io();
var autoload    = require('./lib/autoload');
var memcached   = require('connect-memcached')(express.session);
var bodyParser  = require('body-parser');
var fs          = require('fs');
var path        = require('path');

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Public Folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// setup sessions for express
app.use(express.cookieParser());
app.use(express.session({
    secret: 'monkey',
    store: new memcached({ hosts: ['127.0.0.1:8000'] })
}));

//HTTP Requests logs
var morgan          = require('morgan');
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/storage/logs/requests.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

// Strat Server
var port = process.env.PORT || '3000';
app.listen(port);
console.log('sever listen port:', port);
