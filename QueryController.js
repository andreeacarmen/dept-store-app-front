(function(){
    'use strict';

    var controllerModule = angular.module('controllerModule').controller('QueryContrller', QueryContrller);

    QueryContrller.$inject = ['$scope', '$controller', '$window', '$http'];

    function QueryContrller($scope, $controller, $window, $http) {

		$scope.products = {};

        function getProducts() {
            $http.get('localhost:8080/query').then(function(response) {
                $scope.products = response.data;
            });
        }();

    }
})();