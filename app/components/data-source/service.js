'use strict';

angular.module('snippetshow.components.dataSource', [])

.service('DataSource', ['$resource', function ($resource) {
  return $resource('@@apiEndpoint/posts', {});
}]);
