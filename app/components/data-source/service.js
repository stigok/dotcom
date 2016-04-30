'use strict';

angular.module('snippetshow.components.dataSource', [])

.service('DataSource', ['$http', function ($http) {
  return {
    query: function () {
      return $http.get('@@apiEndpoint/posts').then(function (response) {
        return response.data;
      });
    }
  };
}]);
