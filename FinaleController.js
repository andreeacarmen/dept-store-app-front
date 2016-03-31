(function(){
    'use strict';

    var FinaleModule = angular.module('controllerModule').controller('FinaleController', QueryContrller);

    finaleModule.$inject = ['$scope', '$controller', '$window', '$http'];

    function finaleModule($scope, $controller, $window, $http) {

		$scope.products = {};

        function back() {
            $http.get('localhost:8080/query').then(function(response) {
                $location.path('/query');
            });
        }();

    }
})();