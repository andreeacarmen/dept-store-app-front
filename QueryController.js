(function(){
    'use strict';

    var controllerModule = angular.module('controllerModule');

    controllerModule.controller('QueryController', ['$scope', '$rootScope', '$controller', '$window', '$http', '$location', '$cookieStore', QueryController]);

    function QueryController($scope,$rootScope, $controller, $window, $http, $location, $cookieStore) {
        $scope.queryText;
        $scope.sortFilter = '+name';
        $scope.products = {} ;
        $scope.example1model = "exemplu";
        $scope.example1data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];

        $scope.getFunc = function getItems() {
            var globals = $cookieStore.get('app-data');
            if(!globals){
                 $location.path('/login');
                 return;
            }

            $http({method: 'GET', url: 'http://localhost:8080/query?sid=' + globals.currentSession.sid})
            .then(function(response) {
                $scope.products = response.data;
            }, function(response){$scope.products = "error"});
        };

        $scope.getQuery = function getItemsByQuery() {
             var globals = $cookieStore.get('app-data');
            if(!globals){
                 $location.path('/login');
                 return;
            }
            console.log($rootScope.globals.currentSession.sid);
            $http({method: 'GET', url: 'http://localhost:8080/query?sid='+ globals.currentSession.sid +'&query='+$scope.queryText})
            .then(function(response) {
                $scope.products = response.data;
            }, function(response){$scope.products = "error"});
            
        };

        $scope.order = function(param){
            $scope.sortFilter = param;
            //$scope.getQuery();
        }


        if ( angular.isUndefined($scope.queryText))
            $scope.getFunc();
        else
            $scope.getQuery();


    }
})();