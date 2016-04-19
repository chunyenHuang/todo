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
  it('GET: /todo/John', function (done){
    request('http://localhost:1337/todo/John', function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  it('GET: /user/John', function (done){
    request('http://localhost:1337/user/John', function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  it('POST: /todo', function (done){
    request({
      method: 'post',
      url:'http://localhost:1337/todo',
      json: {name: 'John', item: {item: 'Test', due: new Date()}}
    }, function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  it('PUT: /todo-finished', function (done){
    request({
      method: 'put',
      url:'http://localhost:1337/todo-finished',
      json: {name: 'John', item: {item: 'Test', due: new Date()}}
    }, function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
  it('DELETE: /todo-finished/John', function (done){
    request({
      method: 'delete',
      url:'http://localhost:1337/todo-finished/John'
    }, function(err, res, body) {
      assert.equal(res.statusCode, 200);
      done();
    })
  })
})
