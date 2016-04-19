var app = angular.module('todo');

app.controller('todoController', todo);
app.$inject = ['$http', '$scope'];

function todo($http, $scope) {
  var vm = this;
  activate();

  function activate(){
    getList();
  }

  function getList() {
    var list = $http.get('/todo/John');
    list.then(function (res) {
      vm.undone = res.data.items;
      vm.done = res.data.finished;
    })
  }

  vm.create = function () {
    var newTodo = $http.post('/todo', {name: 'John', item: $scope.newItem, due: $scope.newDate});
    newTodo.then(function (res) {
      getList();
    })
  }
  vm.addToFinished = function (items) {
    var finished = $http.put('/todo-finished', {name: 'John', item: items.item, done: new Date()});
    finished.then(function (res) {
      getList();
    })
  }
  vm.finished = function () {
    var checked = $http.delete('/todo-finished/John');
    checked.then(function (res) {
      getList();
    })
  }
}
