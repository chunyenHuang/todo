var app = angular.module('todo');

app.controller('todoController', todo);
app.$inject = ['$http', '$scope', userService];

function todo($http, $scope, userService) {
  var vm = this;
  activate();

  function activate(){
    showList();
  }
  function showList() {
    var list = userService.getList();
    list.then(function (res) {
      vm.undone = res.data.items;
      vm.done = res.data.finished;
    })
  }
  vm.create = function () {
    var newTodo = userService.create({item: $scope.newItem, due: $scope.newDate});
    newTodo.then(function (res) {
      showList();
    })
  }
  vm.addToFinished = function (items) {
    var finished = userService.addToFinished({item: items.item, done: new Date()});
    finished.then(function (res) {
      showList();
    })
  }
  vm.finished = function () {
    var checked = userService.clearFinished();
    checked.then(function (res) {
      showList();
    })
  }
}
