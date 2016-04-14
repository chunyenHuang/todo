var express = require('express');
var app = express();
var port = process.env.PORT || 1337;

app.listen(port, function () {
  console.log('running on port: ' + port);
})
