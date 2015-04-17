angular.module('app')
  .controller('CurrenciesController', function($scope, $state, Currencies) {
	  console.log(" CALL------------------------------ ");
    Currencies.getAll().then(function(result) {
  	  console.log(result);
      $scope.currencies = result.data;
    });
  });