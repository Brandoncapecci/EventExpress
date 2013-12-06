var express = require('express');
var app = express();

var db = require('./db');
var login = require('./lib/login'),
		signup = require('./lib/signup'),
		home = require('./lib/home'),
		feed = require('./lib/feed'), 
		events = require('./lib/event');

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.cookieParser());

app.use(login);
app.use(signup);
app.use(home);
app.use(feed);
app.use(events);

// app.use(function(req, res) {
// 	res.send('404: Page not Found', 404);
// });
// app.use(function(error, req, res, next) {
// 	res.send('500: Internal Server Error', 500);
// });
app.listen(3000);
console.log('listening on port 3000');