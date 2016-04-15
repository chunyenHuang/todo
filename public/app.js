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
  getList();

  function getList() {
    var list = $http.get('/todo/John');
    list.then(function (res) {
      vm.list = res.data.items;
    })
  }

  vm.create = function () {
    console.log($scope.newItem);
    var newTodo = $http.post('/todo', {name: 'John', item: $scope.newItem});
    newTodo.then(function (res) {
      getList();
    })
  }
  vm.finished = function (item) {
    console.log(item);
    var checked = $http.put('/todo', {name: 'John', item: item});
    checked.then(function (res) {
      getList();
    })
  }
}
