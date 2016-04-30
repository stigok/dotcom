'use strict';

angular.module('snippetshow.views.posts', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/posts/test', {
      templateUrl: 'views/posts/posts.html',
      controller: 'TestController'
    })
    .when('/posts/type/:type', {
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

.controller('TestController', function ($scope) {
  $scope.posts = [
    {
      type: 'text',
      title: 'Hello, world!',
      body: 'What is up?',
      tags: ['hello', 'stuff', 'weed sessions']
    }
  ];
})

.controller('PostsController', ['$scope', '$routeParams', 'DataSource', function ($scope, $routeParams, DataSource) {
  const type = $routeParams.type;
  console.log(type);
  DataSource.query().then(function (posts) {
    if (type) {
      $scope.posts = _.where(posts, {type: type});
    } else {
      $scope.posts = posts;
    }
  });
}]);
