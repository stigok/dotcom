'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'angular-cache',
  'myApp.views.posts',
  'myApp.components.tumblrPost',
  'myApp.components.dataSource'
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/posts/:category/:id', {
      templateUrl: 'views/posts/postDetails.html',
      controller: 'PostDetailViewController'
    })
    .when('/posts/:category?', {
      templateUrl: 'views/posts/posts.html',
      controller: 'PostsController'
    })
    .otherwise({redirectTo: '/posts'});
}]);
