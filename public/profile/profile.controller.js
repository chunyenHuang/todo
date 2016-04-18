var app = angular.module('todo');

app.controller('profileController', profile);
app.$inject = ['$http'];

function profile($http) {
  var vm = this;

  var user = $http({method: 'GET', url:'/user/John'});
  user.then(function (res) {
    vm.user = res.data;
  })
}
