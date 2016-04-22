'use strict';

angular.module('snippetshow.components.tumblrPost', [])

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
//.directive('tumblrPost', function () {
//  return {
//    restrict: 'E',
//    templateUrl: '/app/components/tumblr-post/template.html',
//    controller: ['$scope', '$routeParams', function ($scope, $routeParams) {
//      $scope.category = $routeParams.category;
//    }]
//  };
//})

.directive('tumblrTextPost', function () {
  return {
    restrict: 'E',
    controller: ['$scope', '$sce', function ($scope, $sce) {
      $scope.htmlBody = $sce.trustAsHtml($scope.$parent.post.body);
    }]
  };
})

.directive('tumblrLinkPost', function () {
  return {
    restrict: 'E',
    controller: ['$scope', '$sce', function ($scope, $sce) {
      $scope.htmlDescription = $sce.trustAsHtml($scope.$parent.post.description);
    }]
  };
})

.directive('soundCloudPlayer', function () {
  return {
    restrict: 'E',
    template: '<iframe width="100%" height="465" scrolling="no" frameborder="no"></iframe>',
    link: function (scope, element, attrs) {
      var iframe = element.find('iframe');
      var settings = [
        'buying=false',
        'liking=false',
        'download=false',
        'sharing=false',
        'show_artwork=true',
        'show_comments=false',
        'show_playcount=true',
        'show_user=true',
        'hide_related=true',
        'visual=true',
        'start_track=0',
        'callback=true'
      ];
      var url = attrs.url + '?' + settings.join('&');
      iframe.attr('src', 'https://w.soundcloud.com/player/?url=' + url);
      SC.Widget(iframe.get(0));
    }
  };
})

.directive('tumblrQuotePost', function () {
  return {
    restrict: 'E',
    controller: ['$scope', '$sce', function ($scope, $sce) {
      $scope.htmlText = $sce.trustAsHtml($scope.$parent.post.text);
      $scope.htmlSource = $sce.trustAsHtml($scope.$parent.post.source);
    }]
  };
});
