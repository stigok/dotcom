angular.module('snippetshow.components.tumblrPost', [])
  .directive('tumblrPost', function ($compile, $interpolate, $templateRequest) {
    return {
      restrict: 'E',
      controller: function ($scope, $element) {
        var childDirective = 'tumblr-' + $scope.post.type + '-post';
        $templateRequest('components/tumblr-post/_post.template.html')
          .then(function (template) {
            template = $interpolate(template)({directive: childDirective});
            var compiled = $compile(template)($scope);
            $element.addClass(childDirective);
            $element.append(compiled);
          });
      }
    };
  })

  .factory('TumblrPostDirective', function ($templateRequest) {
    return function (postType, link) {
      return {
        restrict: 'A',
        require: '^^tumblrPost',
        templateUrl: 'components/tumblr-post/' + postType + '.template.html',
        compile: function compile() {
          return {
            pre: link,
            post: function (scope, element) {
              $templateRequest('components/tumblr-post/_post-controls.template.html')
                .then(function (template) {
                  var el = angular.element(template);
                  element.append(el);
                  el.find('ul.tabs').tabs();
                });
            }
          };
        }
      };
    };
  })

  .directive('tumblrTextPost', function (TumblrPostDirective) {
    return new TumblrPostDirective('text');
  })

  .directive('tumblrQuotePost', function (TumblrPostDirective) {
    return new TumblrPostDirective('quote');
  })

  .directive('tumblrChatPost', function (TumblrPostDirective) {
    return new TumblrPostDirective('chat');
  })

  .directive('tumblrPhotoPost', function (TumblrPostDirective) {
    return new TumblrPostDirective('photo');
  })

  .directive('tumblrLinkPost', function (TumblrPostDirective) {
    return new TumblrPostDirective('link');
  })

  .directive('tumblrAudioPost', function (TumblrPostDirective) {
    return new TumblrPostDirective('audio', function (scope, element) {
      element.find('.video-container').html(scope.post.embed);
    });
  })

  .directive('tumblrVideoPost', function (TumblrPostDirective) {
    return new TumblrPostDirective('video', function (scope, element) {
      var index = scope.post.player.length - 1;
      var embed = scope.post.player[index].embed_code;
      element.find('.video-container').html(embed);
    });
  })

  .directive('tumblrPostBody', function ($showdown) {
    return {
      restrict: 'A',
      require: '^tumblrPost',
      scope: {
        markdown: '<'
      },
      link: function (scope, element) {
        // Markdown to HTML
        element.html($showdown.makeHtml(scope.markdown));

        // Syntax highlighting
        element.find('pre code').each(function (i, el) {
          hljs.highlightBlock(el);
        });
        element.find('code').each(function (i, el) {
          el = angular.element(el);
          if (!el.hasClass('hljs')) {
            el.addClass('inline-code');
          }
        });
      }
    };
  });
