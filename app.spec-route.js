var chai = require('chai');
var assert = chai.assert;
var request = require('request');

describe('Routes Test', function (){
  it('GET: /user/', function (done){
    request('http://localhost:1337/user/', function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  it('GET: /login/guest', function (done){
    request('http://localhost:1337/login/guest', function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  it('GET: /todo/', function (done){
    request('http://localhost:1337/todo/', function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  it('GET: /todo/guest', function (done){
    request('http://localhost:1337/todo/guest', function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  it('POST: /todo', function (done){
    request({
      method: 'post',
      url:'http://localhost:1337/todo',
      json: {
        item: 'Test',
        due: new Date(),
      },
    }, function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  it('PUT: /todo-finished', function (done){
    request({
      method: 'put',
      url:'http://localhost:1337/todo-finished',
      json: {item: 'Test', due: new Date()},
    }, function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  it('DELETE: /todo-finished/', function (done){
    request({
      method: 'delete',
      url:'http://localhost:1337/todo-finished/'
    }, function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
})
