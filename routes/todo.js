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
  priority: {
    type: Number,
    required: true },
  complete: {
    type: Boolean,
    default: false,
    required: true }
});

var Todo = mongoose.model('Todo', listSchema);

// Todo.remove({}, function (err) {
//   if (err) return console.log(err);
//   // removed!
// });

router.get('/:id', function (req, res) {
  console.log(req.params.id);
  Todo.find({ _id: req.params.id }, function (err, item) {
    var editItem = item[0];
    if (err) {
      console.log(err);
    }
    else {
      console.log("Item = " + item);
      console.log("Item is = " + typeof item);
      res.render('index', { 
        title: "Edit Your To-Do List",
        item_props: editItem
      });
    }
  });
});

// GET todo page
router.get('/', function(req, res, next) {
  return Todo.find( function (err, tasks) {
    if(!err) {
      res.render('todo', {
        greeting: "Your current To-Do List",
        tasks: tasks
      });
      // console.log(tasks);
    } else {
      return console.error(err);
    }
  });

});

router.delete('/', function(req, res) {
  console.log(req.body);
  Todo.find({ _id: req.body.todo_id })
      .remove(function (err, item) {
        if(err) {
          res.render("error", {
            error: {
              status: 500,
              stack: JSON.stringify(err.errors)
            },
            message: "You failed!"
          })
          console.log(err);
        } else {
          console.log("Item has been deleted.");
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
	}).save(function (err, item) {
		if(err) {
      res.render("error", {
        error: {
          status: 500,
          stack: JSON.stringify(err.errors)
        },
        message: "You failed!"
      })
			console.log(err);
		} else {
      // res.render("todo", {
      //   greeting: "You made it this far.",
      //   tasks: tasks
      // });
  		console.log(item);
      res.redirect('todo');
    }
  });
});

module.exports = router;