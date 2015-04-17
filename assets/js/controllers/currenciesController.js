angular.module('app')
  .controller('CurrenciesController', function($scope, $state, Currencies) {
    Currencies.getAll().then(function(result) {
      $scope.currencies = result.data;
    });
  });