var express = require('express');
var mongodb = require('mongodb');
var _ = require('underscore');
var dbClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;
var database = 'todo';
var url = 'mongodb://localhost/' + database;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var cookieParser = require('cookie-parser');
var app = express();
var port = process.env.PORT || 1337;
var sessions = [];
function sessionToken(length){
  var token = "";
  var possible = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(var x=0; x < length; x++){
    token += possible.charAt(Math.floor(Math.random() * possible.length)+1);
  }
  return token;
}

app.use(jsonParser);
app.use(cookieParser());
app.use(function (req, res, next) {
  var matched = _.where(sessions, {token: req.cookies.todo});
  if (matched.length>0){
    req.username = matched[0].username;
  } else {
    req.username = 'guest';
  }
  next();
});
app.use(express.static('./public/'));

app.get('/user', function (req, res) {
  dbClient.connect(url, function (err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({name: req.username}).toArray(function (err, result) {
        res.json(result[0]);
        db.close();
      })
    } else {
      res.sendStatus(404);
    }
  })
})

app.get('/login/:name', function (req, res) {
  dbClient.connect(url, function (err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({name: req.params.name}).toArray(function (err, result) {
        if (result.length>0) {
          var logged = _.where(sessions, {username: req.params.name});
          console.log(typeof(logged));
          if (logged.length===0) {
            var token = sessionToken(15)
            res.cookie('todo', token);
            sessions.push({username: result[0].name, token: token});
          }
          res.json(result[0]);
        } else {
          users.insert({name: req.params.name, location: 'whatever'});
          users.find({name: req.params.name}).toArray(function (err, result) {
            var logged = _.where(sessions, {username: req.params.name});
            console.log(typeof(logged));
            console.log(logged);
            if (logged.length===0) {
              var token = sessionToken(15)
              res.cookie('todo', token);
              sessions.push({username: result[0].name, token: token});
            }
            res.json(result[0]);
          })
        }
        db.close();
      })
    } else {
      res.sendStatus(404);
    }
  })
})

app.get('/todo', function (req, res) {
  dbClient.connect(url, function (err, db) {
    if (!err) {
      var todos = db.collection('todos');
      todos.find({name: req.username}).toArray(function (err, result) {
        if (result.length>0) {
          res.json(result[0]);
        } else {
          todos.insert({name: req.params.name, items: [], finished:[]}, function (err, result) {
            console.log(result);
            res.json(result);
          })
        }
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
      todos.find({name: req.username}).toArray(function (err, result) {
        var itemArray = result[0].items;
        var newTodo = {
          item: req.body.item,
          due: req.body.due
        }
        itemArray.push(newTodo);
        todos.update({name: req.username}, {$set: {items: itemArray}}, function (err, result) {
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
      todos.find({name: req.username}).toArray(function (err, result) {
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
        todos.update({name: req.username}, {$set: {items: itemArray, finished: finishedArray}}, function (err, result) {
          db.close();
        })
        res.sendStatus(200);
      })
    } else {
      res.sendStatus(404)
    }
  })
})

app.delete('/todo-finished', function (req, res) {
  dbClient.connect(url, function (err, db) {
    if (!err) {
      var todos = db.collection('todos');
      todos.update({name: req.username}, {$set: {finished: []}}, function (err, result) {
        db.close();
      })
      res.sendStatus(200);
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/logout', function (req, res) {
  session = [];
  console.log(session);
  res.sendFile(__dirname+'/public/index.html');
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
