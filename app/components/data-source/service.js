'use strict';

angular.module('snippetshow.components.dataSource', ['angular-cache'])

.config(function (CacheFactoryProvider) {
  angular.extend(CacheFactoryProvider.defaults, {maxAge: 15 * 60 * 1000});
})

.service('DataSource', function (CacheFactory, $http) {
  if (!CacheFactory.get('postsCache')) {
    // or CacheFactory('postsCache', { ... });
    CacheFactory.createCache('postsCache', {
      deleteOnExpire: 'aggressive',
      recycleFreq: 60000
    });
  }

  var postsCache = CacheFactory.get('postsCache');

  return {
    posts: function () {
      return $http.get('/data/posts-stigok.json', {cache: postsCache});
    }
  };
});
