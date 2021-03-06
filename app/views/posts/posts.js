'use strict';

angular.module('snippetshow.views.posts', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/posts/type/:type?', {
      templateUrl: 'views/posts/posts.html',
      controller: 'PostsController'
    })
    .when('/posts/details/:postId', {
      templateUrl: 'views/posts/posts.html',
      controller: 'PostDetailsController'
    })
    .when('/posts/:category?', {
      templateUrl: 'views/posts/posts.html',
      controller: 'PostsController'
    });
}])

.controller('PostsController', function ($scope, $routeParams, Posts, $log) {
  $log.log('Multi post view');
  const type = $routeParams.type;
  Posts.query().then(function (posts) {
    if (type) {
      $scope.posts = _.where(posts, {type: type});
    } else {
      $scope.posts = posts;
    }
  });
})

.controller('PostDetailsController', function ($scope, $routeParams, Posts, $log) {
  //const postid = $routeParams.postId;
  /*Posts.get({id: postid}).then(function (post) {
    $scope.posts = [post];
  });*/
  $log.log('Single post view');
  $scope.$routeParams = $routeParams;
  Posts.get($routeParams.postId).then(function (post) {
    $scope.posts = [post];
  });
});
