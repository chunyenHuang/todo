var app = angular.module('todo', []); // add [] for new module
app.controller('homeController', home);
app.$inject = ['$http'];

function home($http) {
  var vm = this;
  vm.message = 'Angular JS is here';

  var user = $http({method: 'GET', url:'/user/John'});
  user.then(function (res) {
    vm.user = res.data;
  })
}
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
    var newTodo = $http.post('/todo', {name: 'John', item: $scope.newItem});
    newTodo.then(function (res) {
      getList();
    })
  }
  vm.addToFinished = function (item) {
    var finished = $http.put('/todo-finished', {name: 'John', item: item});
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
