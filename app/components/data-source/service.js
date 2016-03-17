'use strict';

angular.module('snippetshow.components.dataSource', ['angular-cache'])

.config(function (CacheFactoryProvider) {
  angular.extend(CacheFactoryProvider.defaults, {maxAge: 15 * 60 * 1000});
})

.service('DataSource', function (CacheFactory, $http) {
  return {
    posts: function () {
      return $http.get('/api/posts.json');
    }
  };
});
