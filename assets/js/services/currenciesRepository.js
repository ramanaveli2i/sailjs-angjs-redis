angular.module('app')
  .factory('Currencies', function($http) {
    return {
      getAll: function() {
        return $http.get('/currencies/getAll');
      },
      create: function(currency) {
        return $http.post('/currencies', {body: currency});
      },
      update: function(currency) {
        return $http.post('/currencies', currency);
      },
      remove: function(currency) {
        return $http.delete('/currencies', currency);
      }
    }
  });