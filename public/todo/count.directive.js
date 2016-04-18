var app = angular.module('todo');

app.directive('count', function () {
  return {
    templateUrl: 'todo/count.directive.html'
  }
})
