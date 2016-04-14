var express = require('express');
var app = express();
var port = process.env.PORT || 1337;

app.use(express.static('./public/'));

app.get('/current-user', function (req, res) {
  var currentUser = {
    name: 'John',
    location: 'Irvine'
  };
  res.json(currentUser);
})

app.listen(port, function () {
  console.log('running on port: ' + port);
})
