var app = angular.module('todo');

app.directive('list', function () {
  return {
    templateUrl: 'todo/list.directive.html'
  }
})
