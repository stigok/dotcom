angular.module('snippetshow.components.tumblrPostControls', [])
  .directive('tumblrPostControls', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/tumblr-post/_post-controls.template.html',
      compile: function () {
        return {
          post: function (scope, element) {
            element.find('.tabs').tabs();
          }
        };
      }
    };
  });
