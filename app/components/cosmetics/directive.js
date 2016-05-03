angular.module('snippetshow.components.cosmetics', [])
  .directive('backgroundIndex', function () {
    return {
      restrict: 'A',
      scope: {
        backgroundIndex: '@'
      },
      link: function (scope, element) {
        var materializeColors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'];
        element.addClass(materializeColors[scope.backgroundIndex % materializeColors.length]);
      }
    };
  });
