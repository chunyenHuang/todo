var app = angular.module('todo');

app.controller('profileController', profile);
app.$inject = ['$http', '$scope', 'userService'];

function profile($http, $scope, userService) {
  var vm = this;

  var user = userService.getUser();
  user.then(function (res) {
    vm.user = res.data;
  })
  vm.login = function () {
    var user = $http.get('/login/' + $scope.username);
    user.then(function () {
      $('#login').modal('hide');
    })
  }
}
