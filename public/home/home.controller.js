var app = angular.module('todo');

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
