'use strict';

// Declare app level module which depends on views, and components
angular.module('snippetshow', [
  'ngRoute',
  'angular-cache',
  'snippetshow.views.posts',
  'snippetshow.components.tumblrPost',
  'snippetshow.components.dataSource'
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
    .when('/about', {
      templateUrl: 'templates/about.html'
    })
    .otherwise({redirectTo: '/posts'});
}]);
