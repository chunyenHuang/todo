var app = angular.module('todo');
app.directive('login', login);
function login() {
  return {
    templateUrl: 'profile/login.html'
  }
}
