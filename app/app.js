'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.views.posts',
  'myApp.components.posts'
])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/posts'});
}]);
