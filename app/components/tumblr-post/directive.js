'use strict';

angular.module('snippetshow.components.tumblrPost', [])

.directive('tumblrPost', function () {
  return {
    restrict: 'E',
    scope: {
      post: '<'
    },
    controller: function ($scope, $compile, $element) {
      var tag = 'tumblr-' + $scope.post.type + '-post';
      var el = $compile('<' + tag + '></' + tag + '>')($scope);
      $element.html(el);
    }
  };
})

.factory('TumblrPostDirective', function () {
  return function (postType, link) {
    return {
      restrict: 'E',
      require: '^^tumblrPost',
      templateUrl: 'components/tumblr-post/' + postType + '.template.html',
      link: link
    };
  };
})

.directive('tumblrTextPost', function (TumblrPostDirective) {
  return new TumblrPostDirective('text');
})

.directive('tumblrLinkPost', function (TumblrPostDirective) {
  return new TumblrPostDirective('link');
})

.directive('tumblrAudioPost', function (TumblrPostDirective) {
  return new TumblrPostDirective('audio');
})

.directive('tumblrVideoPost', function (TumblrPostDirective) {
  return new TumblrPostDirective('video', function (scope, element) {
    var container = angular.element('<div class="video-container" />');
    var embed = 'Unable to load media player';
    if (scope.post.video_type === 'youtube') {
      var src = 'https://www.youtube.com/embed/' + scope.post.video.youtube.video_id;
      embed = '<iframe width="100%" height="420" src="' + src + '" frameborder="0" allowfullscreen></iframe>';
    }
    container.append(embed);
    element.html(container);
  });
})

.directive('tumblrPhotoPost', function (TumblrPostDirective) {
  return new TumblrPostDirective('photo', function (scope, element) {
    var el = element.find('.parallax');
    console.log(el);
    $(el).parallax();
  });
})

.directive('tumblrQuotePost', function (TumblrPostDirective) {
  return new TumblrPostDirective('quote');
})

.directive('tumblrPostBody', function ($showdown) {
  return {
    restrict: 'A',
    require: '^^tumblrPost',
    link: function (scope, element) {
      element.html($showdown.makeHtml(scope.post.body));
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
});
