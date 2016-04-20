var app = angular.module('todo');

app.controller('homeController', home);
app.$inject = ['$http', 'userService'];

function home($http, userService) {
  var vm = this;
  vm.message = "Todo List";

  var user = userService.getUser();
  user.then(function (res) {
    vm.user = res.data;
  })


}
