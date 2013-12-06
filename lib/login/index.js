var express = require('express');
var app = module.exports = express();
var helpers = require('../helpers')(app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/login', function(req, res) {
	helpers.mustBeLoggedOut(req, res);	
	res.render('login');
});

// API
var mongoose = require('mongoose');
var User = mongoose.model('User');

app.post('/login', function(req, res) {
	var user_email = req.body.email;
	var user_password = req.body.password; //TODO: encrypt

  User.find({'email': user_email, 'password': user_password}).limit(1).exec( function (err, user) {
		if (user[0] != undefined) {
			res.cookie('email', user_email, { maxAge: 900000, httpOnly: true }); //TODO: appropriate time 365 * 24 * 60 * 60 * 1000
			return res.send("logged in");
		} else {
			return res.send("credentials incorrect");
		}	
	});
});

app.post('/logout', function(req, res) {
  res.clearCookie('email');
  return res.send("logged out");	
});