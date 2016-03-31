(function(){
    'use strict';

    var controllerModule = angular.module('controllerModule');

    controllerModule.controller('QueryController', ['$scope', '$controller', '$window', '$http', QueryController]);

    function QueryController($scope, $controller, $window, $http) {
        $scope.queryText;

        $scope.products = {} ;
        $scope.example1model = "exemplu";
        $scope.example1data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];

        $scope.getFunc = function getItems() {
            $http({method: 'GET', url: 'http://localhost:8080/query'})
            .then(function(response) {
                $scope.products = response.data;
            }, function(response){$scope.products = "error"});
        };

        $scope.getQuery = function getItemsByQuery() {
            $http({method: 'GET', url: 'http://localhost:8080/query?query='+$scope.queryText})
            .then(function(response) {
                $scope.products = response.data;
            }, function(response){$scope.products = "error"});
            
        };

        if ( angular.isUndefined($scope.queryText))
            $scope.getFunc();
        else
            $scope.getQuery();


    }
})();