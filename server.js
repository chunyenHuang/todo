var express = require('express');
var app = express();
var port = process.env.PORT || 1337;

app.use(express.static('./public/'));

app.get('/user', function (req, res) {
  var user = {
    name: 'John',
    location: 'Irvine'
  };
  res.json(user);
})

app.get('/todo/:user', function (req, res) {
  if (req.params.user === 'John') {
    res.send(['say hi', 'drink some water']);
  } else {
    res.sendStatus(404);
  }
})

app.listen(port, function () {
  console.log('running on port: ' + port);
})
