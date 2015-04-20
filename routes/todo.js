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
  dueDate: String,
  timeStamp: { 
  	type: Date, 
  	default: Date.now() },
  title: String,
  description: String,
  priority: {
    type: Number,
    required: true },
  complete: Boolean
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
        greeting: "Your current Tasks",
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

  if (req.body._id) { // item already had an _id, so it needs to be updated
    
    Todo.findOne({ _id: req.body._id}, function(err, item) {
      if (err) {
        console.log(err);
      } else {
        // once it is found, update it
        item.dueDate = req.body.dueDate;
        item.title = req.body.title;
        item.description = req.body.description;
        item.priority = req.body.priority;
        // CHECKBOX VALUES sent through a form ARE EITHER 'on' or 'undefined'
        //item.complete = (req.body.completed == 'on') ? true : false;
        item.complete = (req.body.completed) ? true : false;

        item.save(function(err, updateItem) {
          if (err) {
            console.log(err)
          } else {
            res.redirect('todo');
          }
        });
      }
    });
  }
  else {
    // do initial save
    new Todo({
      dueDate: req.body.dueDate,
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      complete: (req.body.completed == 'on') ? true : false
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

  }

});

module.exports = router;