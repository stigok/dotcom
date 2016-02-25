'use strict';

angular.module('myApp.components.posts', [])

.directive('tumblrPosts', [function () {
  return {
    restrict: 'E',
    templateUrl: 'components/posts/posts-template.html',
    scope: {
      posts: '=posts'
    }
  };
}])

.directive('textPost', [function () {
  return {
    restrict: 'E',
    controller: ['$scope', '$sce', function ($scope, $sce) {
      $scope.post = $scope.$parent.post;
      $scope.postBodyHtml = $sce.trustAsHtml($scope.post.body);
    }]
  };
}])

.directive('permalinkButton', [function () {
  return {
    restrict: 'E',
    template: '<a ng-href="{{post.post_url}}"><span class="glyphicon glyphicon-new-window"></span></a>'
  };
}]);
