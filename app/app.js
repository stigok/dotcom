'use strict';

// Declare app level module which depends on views, and components
angular.module('snippetshow', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'snippetshow.views.posts',
  'snippetshow.components.tumblrPost',
  'snippetshow.components.dataSource',
  'snippetshow.components.cosmetics',
  'ng-showdown'
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/posts', {
      controller: 'PostsController'
    })
    .when('/about', {
      templateUrl: 'templates/about.html'
    })
    .otherwise({redirectTo: '/posts'});
}])

.config(function ($showdownProvider) {
  $showdownProvider.setOption('noHeaderId', true);
  $showdownProvider.setOption('headerLevelStart', 2);
});
