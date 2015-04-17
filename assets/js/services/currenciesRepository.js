angular.module('app')
  .factory('Currencies', function($http) {
    return {
      getAll: function() {
        console.log(" --------- GET ALL ------------- ");
        return $http.get('/currencies');
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