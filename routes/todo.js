var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

// check for errors on database connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("yay! you are connected");
});

// define your database schema
var listSchema = mongoose.Schema({
  dueDate: Date,
  timeStamp: { 
  	type: Date, 
  	default: Date.now() },
  title: String,
  description: String,
  priority: Number,
  complete: Boolean
});

var Todo = mongoose.model('Todo', listSchema);

// GET todo page
router.get('/', function(req, res, next) {
  return Todo.find( function (err, tasks) {
    if(!err) {
      res.render('todo', {
        greeting: "You made it this far.",
        tasks: tasks
      });
      // console.log(tasks);
    } else {
      return console.error(err);
    }
  });
});

// POST form
router.post('/', function(req, res) {
	new Todo({
		dueDate: req.body.dueDate,
		title: req.body.title,
		description: req.body.description,
		priority: req.body.priority,
		complete: false
	}).save(function (err, title) {
		if(err) {
			return console.log(err);
		}
		console.log(title);
	});
	res.redirect('todo');
});

module.exports = router;