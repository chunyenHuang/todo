var express = require('express');
var mongodb = require('mongodb');
var dbClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;
var database = 'todo'; // users, todos
var url = 'mongodb://localhost/' + database;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var port = process.env.PORT || 1337;

app.use(jsonParser);
app.use(express.static('./public/'));

app.get('/user/:name', function (req, res) {
  console.log(req.url);
  dbClient.connect(url, function (err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({name: req.params.name}).toArray(function (err, result) {
        db.close();
        res.json(result[0]);
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
        db.close();
        res.json(result[0]);
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
        itemArray.push(req.body.item);
        todos.update({name: req.body.name}, {$set: {items: itemArray}}, function (err, result) {
          db.close()
        })
        res.json(result[0]);
      })
    } else {
      res.sendStatus(404);
    }
  })
})

app.get('/todo-check/:item', function (req, res) {
  console.log(req.url);
  var position = todoArray.indexOf(req.params.item);
  todoArray.splice(position, 1);
  res.send(todoArray);
})

app.listen(port, function () {
  console.log('running on port: ' + port);
})
