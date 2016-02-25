'use strict';

angular.module('myApp.views.posts', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/posts/:category?', {
    template: '<tumblr-posts posts="posts"></tumblr-posts>',
    controller: 'PostsViewController'
  });
  //.when('/posts/:id', {
  //  template: '<tumblr-posts></tumblr-posts>'
  //});
}])

.controller('PostsViewController', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
  var category = $routeParams.category;

  $http({
    method: 'GET',
    url: '/data/posts-stigok.json'
  }).then(function success(res) {
    if (category) {
      category = category.replace('-', ' ');
      $scope.posts = _.filter(res.data.response.posts, function (post) {
        return _.contains(post.tags, category);
      });
    } else {
      $scope.posts = res.data.response.posts;
    }
  });
}]);
