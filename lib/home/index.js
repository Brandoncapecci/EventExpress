var express = require('express');
var app = module.exports = express();
var helpers = require('../helpers')(app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	helpers.mustBeLoggedOut(req, res);
	res.render('home');
});