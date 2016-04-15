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
    var todoArray = [
      'say hi to kitten',
      'drink some water',
      'code',
      'starwar 7',
      'ola',
    ];
    res.send(todoArray);
  } else {
    res.sendStatus(404);
  }
})

app.listen(port, function () {
  console.log('running on port: ' + port);
})
