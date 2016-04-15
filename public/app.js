var app = angular.module('todo', []); // add [] for new module
app.controller('homeController', home);
app.$inject = ['$http'];

function home($http) {
  var vm = this;
  vm.message = 'Angular JS is here';

  var user = $http({method: 'GET', url:'/user'});
  user.then(function (res) {
    vm.user = res.data;
  })
}

app.controller('todoeController', todo);

function todo($http) {
  var vm = this;
  var todo = $http.get('/todo/John');
  todo.then(function (res) {
    vm.list = res.data;
  })
}
