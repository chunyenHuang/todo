var app = angular.module('todo', []); // add [] for new module
app.controller('homeController', home);

app.$inject = ['$http'];

function home($http) {
  var vm = this;
  vm.message = 'Angular JS is here';

  var currentUser = $http({method: 'GET', url:'/current-user'});
  currentUser.then(function (res) {
    vm.currentUser = res.data;
  })
}
