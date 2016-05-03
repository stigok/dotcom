'use strict';

angular.module('snippetshow.components.dataSource', [])

.service('DataSource', ['$http', '$q', function ($http, $q) {
  return {
    query: function () {
      /*return $q(function (resolve) {
        resolve([
          {
            type: 'text',
            title: 'Hello, world!',
            body: 'What is up?',
            tags: ['hello', 'stuff', 'weed sessions']
          }
        ]);
      });*/
      return $http.get('@@apiEndpoint/posts').then(function (response) {
        return response.data;
      });
    }
  };
}]);
