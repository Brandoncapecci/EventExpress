var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var User = new Schema({
	name        	: String,
	email         : String,
	password      : String,
	events        : Array, //TODO: rename to somehting like subscriptions - event is reserved word in js
	created_on    : Date
});

var Event = new Schema({
	title         : String,
	location			: String,
	category			: String,
	created_on    : Date
});

var Comment = new Schema({
	event_title		: String, //assuming this stays unique... make explicit in schema
	email					: String,
	body         	: String,
	created_on    : Date
});

var Photo = new Schema({
	event_title		: String, //assuming this stays unique
	email					: String,
	location      : String,
	created_on    : Date
});

var UserModel  = mongoose.model('User', User);
var EventModel  = mongoose.model('Event', Event);
var CommentModel  = mongoose.model('Comment', Comment);
var PhotoModel  = mongoose.model('Photo', Photo);

mongoose.connect('mongodb://localhost/db');