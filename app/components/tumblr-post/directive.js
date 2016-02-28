'use strict';

angular.module('myApp.components.tumblrPost', [])

.directive('tumblrPost', [function () {
  return {
    restrict: 'E',
    controller: ['$scope', '$sce', function ($scope, $sce) {
      $scope.post = $scope.$parent.post;
      $scope.type = $scope.post.type;

      if ($scope.post.format === 'markdown') {
        $scope.body = $scope.post.body;
      } else if ($scope.type === 'text') {
        $scope.body = $sce.trustAsHtml($scope.post.body);
      }
    }]
  };
}])

.directive('tumblrTextPost', function () {
  return {
    restrict: 'E',
    controller: ['$scope', '$sce', function ($scope, $sce) {
      $scope.htmlBody = $sce.trustAsHtml($scope.$parent.post.body);
    }]
  };
});
