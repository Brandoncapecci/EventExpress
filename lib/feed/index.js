var express = require('express');
var app = module.exports = express();
var helpers = require('../helpers')(app);

app.set('views', __dirname);
app.set('view engine', 'jade');

// API
var mongoose = require('mongoose');
var Event = mongoose.model('Event');

app.get('/feed', function(req, res) {
	helpers.mustBeLoggedIn(req, res);
	Event.find().sort('-created_on').exec( function (err, result) {
		res.render('feed', {
			email: req.cookies.email,
			events: result
		});
	});
});

app.post('/create_event', function(req, res) {
	var event_title = req.body.title;
	var event_location = req.body.location;
	var now = Date.now();

	Event.find({'title': event_title}).limit(1).exec( function (err, result) {
		if (result[0] == undefined) {
			var new_event = new Event({
        title      : event_title,
        location   : event_location,
        created_on : now
      });
			new_event.save(function (err) {
        if (!err) {
          return res.send("post created");
        } else {
          return console.log(err);
        }
      });
		} else {
			return res.send("title exists"); //TODO: reccommend old event / merge
		}	
	});
});