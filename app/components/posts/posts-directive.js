'use strict';

angular.module('myApp.components.posts.posts-directive', [])

.directive('tumblrPosts', [function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/posts.html',
    controller: 'PostsController',
    scope: {
      posts: '=posts'
    }
  };
}]);
