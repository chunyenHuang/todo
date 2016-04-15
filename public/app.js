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
  var todo = $http.get('/todo/John');
  todo.then(function (res) {
    vm.list = res.data.items;
  })
  vm.create = function () {
    console.log($scope.newItem);
    var newTodo = $http.post('/todo', {name: 'John', item: $scope.newItem});
    newTodo.then(function (res) {
      vm.list = res.data.items;
    })
  }
  vm.finished = function (item) {
    console.log(item);
    var checked = $http.get('/todo-check/'+item);
    checked.then(function (res) {
      vm.list = res.data.items;
    })
  }
}
