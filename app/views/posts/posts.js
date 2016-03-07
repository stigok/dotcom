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

.controller('PostsController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
  var category = $routeParams.category;

  $http.get('/data/posts-stigok.json').then(function success(res) {
    if (category) {
      category = category.replace('-', ' ');
      $scope.posts = _.filter(res.data.posts, function (post) {
        return _.contains(post.tags, category);
      });
    } else {
      $scope.posts = res.data.posts;
    }
  });
}]);

//.controller('PostDetailsController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
//  let id = $routeParams.id;
//
//  $http({
//    method: 'GET',
//    url: '/data/posts-stigok.json'
//  }).then(function success(res) {
//    if (category) {
//      category = category.replace('-', ' ');
//      $scope.posts = _.filter(res.data.response.posts, function (post) {
//        return _.contains(post.tags, category);
//      });
//    } else {
//      $scope.posts = res.data.response.posts;
//    }
//  });
//}]);
//
