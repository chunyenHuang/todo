var app = angular.module('todo');

app.directive('greetingHome', greeting);
function greeting() {
  return {
    templateUrl: 'home/greetingHome.html'
  }
}
