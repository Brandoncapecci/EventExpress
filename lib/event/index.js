var express = require('express');
var app = module.exports = express();
var helpers = require('../helpers')(app);
var fs = require('fs'),
		AWS = require('aws-sdk');
var s3 = new AWS.S3();

app.set('views', __dirname);
app.set('view engine', 'jade');

// API
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Comment = mongoose.model('Comment');
var Photo = mongoose.model('Photo');

app.get('/e/:title', function(req, res) {
	helpers.mustBeLoggedIn(req, res); //TODO: should you have to be logged in? - maybe let people see event if it's open but not comment
  var url_title = req.params.title;

  res.cookie('url', url_title, { maxAge: 900000, httpOnly: true }); //TODO: why am i using a cookie here? change this!
  Event.find({ title : url_title }).limit(1).exec( function ( err, event_result ) {
  	Comment.find({ event_title : url_title }).exec( function ( err, comments_result ) {
	  	Photo.find({ event_title : url_title }).exec( function ( err, photos_result ) {
		  	res.render('event', {
					email: req.cookies.email,
					events: event_result[0],
					comments: comments_result,
					photos: photos_result
				});
		  });
	  });
  });
});

app.post('/create_comment', function(req, res) {
	var comment_url = req.cookies.url;
	var comment_email = req.cookies.email;
	var comment_body = req.body.body;
	var now = Date.now();

	var new_comment = new Comment({
    event_title	: comment_url,
    email		   	: comment_email,
   	body 			 	: comment_body,
    created_on 	: now
  });
	new_comment.save(function (err) {
    if (!err) {
      return res.send("comment created");
    } else {
      return console.log(err);
    }
  });
});

app.post('/create_photo', function(req, res) {
	var photo_url = req.cookies.url;
	var photo_email = req.cookies.email;
	var photo_name = req.files.image.name;
	var now = Date.now();

	fs.readFile(req.files.image.path, function (err, data) {
		var new_photo = new Photo({
				event_title	: photo_url,
				email		   	: photo_email,
		    created_on 	: now
		});
		new_photo.save(function (err, photo) {
	    if (!err) {
	    	var params = {Bucket: 'EventSite', Key: photo.id, Body: data}; //extension doesnt seem necessary - just keep bucket open
	    	s3.putObject(params, function(err, data) {
	    		if (!err)
	    			return res.send("photo created"); //TODO: return the photo.id and append img to body
	    		else
	    			console.log("Something went wrong");
	    	});	
	    } else {
	      return console.log(err);
	    }
	  });	
	});
});





