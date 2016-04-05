'use strict';

angular.module('snippetshow.views.posts', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/posts/:category?', {
      templateUrl: '/views/posts/posts.html',
      controller: 'PostsController'
    })
    .when('/posts/:id', {
      templateUrl: '/views/posts/postDetails.html',
      controller: 'PostDetailsController'
    });
}])

.controller('PostsController', ['$scope', '$routeParams', 'DataSource', function ($scope, $routeParams, DataSource) {
  $scope.category = $routeParams.category;
  var posts = DataSource.query(function () {
    if ($scope.category) {
      $scope.posts = _.filter(posts, function (post) {
        return post.tags.indexOf($scope.category) !== -1;
      });
    } else {
      $scope.posts = posts;
    }
  });
}]);
