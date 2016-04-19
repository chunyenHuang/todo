var express = require('express');
var mongodb = require('mongodb');
var _ = require('underscore');
var dbClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;
var database = 'todo';
var url = 'mongodb://localhost/' + database;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var port = process.env.PORT || 1337;

app.use(jsonParser);
app.use(express.static('./public/'));

app.get('/user/:name', function (req, res) {
  dbClient.connect(url, function (err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({name: req.params.name}).toArray(function (err, result) {
        res.json(result[0]);
        db.close();
      })
    } else {
      res.sendStatus(404);
    }
  })
})

app.get('/todo/:name', function (req, res) {
  dbClient.connect(url, function (err, db) {
    if (!err) {
      var todos = db.collection('todos');
      todos.find({name: req.params.name}).toArray(function (err, result) {
        res.json(result[0]);
        db.close();
      })
    } else {
      res.sendStatus(404);
    }
  })
})

app.post('/todo', function (req, res) {
  dbClient.connect(url, function (err, db) {
    if (!err) {
      var todos = db.collection('todos');
      todos.find({name: req.body.name}).toArray(function (err, result) {
        var itemArray = result[0].items;
        var newTodo = {
          item: req.body.item,
          due: req.body.due
        }
        itemArray.push(newTodo);
        todos.update({name: req.body.name}, {$set: {items: itemArray}}, function (err, result) {
          db.close();
        })
        res.json(result[0]);
      })
    } else {
      res.sendStatus(404);
    }
  })
})

app.put('/todo-finished', function (req, res) {
  dbClient.connect(url, function (err, db) {
    if (!err) {
      var todos = db.collection('todos');
      todos.find({name: req.body.name}).toArray(function (err, result) {
        var finishedArray = result[0].finished;
        var doneTodo = {
          item: req.body.item,
          done: req.body.done
        }
        finishedArray.push(doneTodo);
        var itemArray = result[0].items;
        var found = _.where(itemArray, {item: req.body.item});
        var position = itemArray.indexOf(found[0]);
        itemArray.splice(position, 1);
        todos.update({name: req.body.name}, {$set: {items: itemArray, finished: finishedArray}}, function (err, result) {
          db.close();
        })
        res.sendStatus(200);
      })
    } else {
      res.sendStatus(404)
    }
  })
})

app.delete('/todo-finished/:name', function (req, res) {
  dbClient.connect(url, function (err, db) {
    if (!err) {
      var todos = db.collection('todos');
      todos.update({name: req.params.name}, {$set: {finished: []}}, function (err, result) {
        db.close();
      })
      res.sendStatus(200);
    } else {
      res.sendStatus(404)
    }
  })
})

if (!require.main.loaded) {
  app.listen(port, function () {
    console.log('running on port: ' + port);
  })
}

app.on('close', function() {
  console.log('rs');
})

module.exports = app;
