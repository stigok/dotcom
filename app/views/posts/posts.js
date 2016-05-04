'use strict';

angular.module('snippetshow.views.posts', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/posts/type/:type?', {
      templateUrl: 'views/posts/posts.html',
      controller: 'PostsController'
    })
    .when('/posts/:category?', {
      templateUrl: 'views/posts/posts.html',
      controller: 'PostsController'
    })
    .when('/posts/:category/:id', {
      templateUrl: 'views/posts/postDetails.html',
      controller: 'PostDetailsController'
    });
}])

.controller('PostsController', ['$scope', '$routeParams', 'Posts', function ($scope, $routeParams, Posts) {
  const type = $routeParams.type;
  Posts.query().then(function (posts) {
    if (type) {
      $scope.posts = _.where(posts, {type: type});
    } else {
      $scope.posts = posts;
    }
  });
}]);
