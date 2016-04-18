var chai = require('chai');
var assert = chai.assert;
var request = require('request');
var app = require('./app.js');

var RANDOMIZE = 0;
var server = app.listen(RANDOMIZE);
var port = server.address().port;

describe('Todos can', function (){
  it('be returned within', function (done){
    request('http://localhost:' + port + '/todo/John', function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  after(function(){
    server.close();
  })
})
