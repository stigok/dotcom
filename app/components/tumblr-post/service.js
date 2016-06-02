angular.module('snippetshow.components.posts', [])

.service('Posts', ['$http', '$q', function ($http, $q) {
  return {
    query: function () {
      //return $http.get('@@apiEndpoint/posts').then(function (response) {
      return $http.get('/api/posts.json').then(function (response) {
        return response.data;
      });
    },
    get: function (id) {
      return $http.get('/api/posts.json')
        .then(function (response) {
          var posts = response.data;
          var single = _.findWhere(posts, {id: Number(id)});
          return single;
        });
    }
  };
}]);
