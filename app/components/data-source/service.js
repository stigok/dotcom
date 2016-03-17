'use strict';

angular.module('snippetshow.components.dataSource')

.service('DataSource', function ($http) {
  return {
    posts: function () {
      return $http.get('/api/posts.json');
    }
  };
});
