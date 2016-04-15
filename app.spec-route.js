var chai = require('chai');
var assert = chai.assert;
var request = require('request');

describe('Routes Test', function (){
  it('GET: /todo/John', function (done){
    request('http://localhost:1337/todo/John', function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
})
