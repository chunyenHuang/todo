var app = angular.module('todo', []); // add [] for new module

app.controller('homeController', home);

function home() {
  var vm = this;
  vm.message = 'Angular JS is here';
}
