'use strict';

angular.module('snippetshow.components.posts', [])

.service('Posts', ['$http', '$q', function ($http, $q) {
  return {
    query: function () {
      return $q(function (resolve) {
        resolve([
          {
            type: 'text',
            title: 'Hello, world!',
            body: 'What is up?',
            tags: ['hello', 'stuff', 'weed sessions']
          }
        ]);
      });/*
      return $http.get('@@apiEndpoint/posts').then(function (response) {
        return response.data;
      });*/
    },
    get: function (postid) {
      return $http.get('/api/singlepost.json',
        {
          params: {
            api_key: 'JaxGeeKKJw1taQn4M0WhuaYgsYcuxIp0TSMcaYmZ4JdelPU4Yd',
            id: postid
          }
        }).then(function (response) {
          return response.data.response.posts[0];
        });
    }
  };
}]);
