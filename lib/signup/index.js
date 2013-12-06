var express = require('express');
var app = module.exports = express();
var helpers = require('../helpers')(app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/signup', function(req, res) {
	helpers.mustBeLoggedOut(req, res);		
	res.render('signup');
});


// API
var mongoose = require('mongoose');
var User = mongoose.model('User');

app.post('/signup', function(req, res) {
	var user_email = req.body.email;
	var user_password = req.body.password; //TODO: encrypt
	var now = Date.now();

	User.find({'email': user_email}).limit(1).exec( function (err, email) {
		if (email[0] == undefined) {
			var new_user = new User({
        email      : user_email,
        password   : user_password,
        created_on : now
      });
			new_user.save(function (err) {
        if (!err) {
          res.cookie('email', user_email, { maxAge: 900000, httpOnly: true });
          return res.send("saved");
        } else {
          return console.log(err);
        }
      });
		} else {
			return res.send("email exists");
		}	
	});
});