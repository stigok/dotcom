angular.module('snippetshow.components.tumblrPostControls', [])
  .directive('tumblrPostControls', function ($document) {
    return {
      restrict: 'E',
      templateUrl: 'components/tumblr-post/_post-controls.template.html',
      compile: function () {
        return {
          post: function (scope, element) {
            element.find('.tabs').tabs();

            // Disable chips.js element hooks
            // TODO: make your own chips
            var chipIconSelector = '.chip .material-icons';
            $document.off(chipIconSelector);
          }
        };
      }
    };
  });
