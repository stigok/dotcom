'use strict';

angular.module('snippetshow.components.dataSource', [])

.service('DataSource', ['$http', function ($http) {
  return {
    posts: function () {
      return $http.get('/api/posts.json');
    }
  };
}]);
