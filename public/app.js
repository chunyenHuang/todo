var app = angular.module('todo', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/todo', {
      templateUrl: 'todo/todo-view.html',
      controller: 'todoController',
      controllerAs: 'todo',
    })
    .when('/profile', {
      templateUrl: 'profile/show.html',
      controller: 'profileController',
      controllerAs: 'profile'
    });
}]);

app.factory('userService', userService);
userService.$inject = ['$http'];
function userService($http) {
  function getUser() {
    return $http.get('/user');
  }
  function getList() {
    return $http.get('/todo');
  }
  function create(object) {
    return $http.post('/todo', object);
  }
  function addToFinished(object) {
    return $http.put('/todo-finished', object);
  }
  function clearFinished() {
    return $http.delete('/todo-finished');
  }

  return {
    getUser: getUser,
    getList: getList,
    create: create,
    addToFinished: addToFinished,
    clearFinished: clearFinished,
  }
}


$(window).load(function(){
  $('#login').modal('show');
});
