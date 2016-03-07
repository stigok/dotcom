'use strict';

angular.module('myApp.components.tumblrPost', [])

//.directive('tumblrPost', [function () {
//  return {
//    restrict: 'E',
//    controller: ['$scope', '$sce', function ($scope, $sce) {
//      $scope.post = $scope.$parent.post;
//      $scope.type = $scope.post.type;
//
//      //if ($scope.post.format === 'markdown') {
//      //  $scope.body = $scope.post.body;
//      //}
//
//      if ($scope.post.type === 'text') {
//        $scope.htmlContent = $sce.trustAsHtml($scope.post.body);
//      }
//      if ($scope.post.type === 'quote') {
//        $scope.htmlContent = $sce.trustAsHtml($scope.post.text);
//      }
//    }]
//  };
//}])

.directive('tumblrTextPost', function () {
  return {
    restrict: 'E',
    controller: ['$scope', '$sce', function ($scope, $sce) {
      $scope.htmlBody = $sce.trustAsHtml($scope.$parent.post.body);
    }]
  };
})

.directive('tumblrQuotePost', function () {
  return {
    restrict: 'E',
    controller: ['$scope', '$sce', function ($scope, $sce) {
      $scope.htmlText = $sce.trustAsHtml($scope.$parent.post.text);
    }]
  };
});
