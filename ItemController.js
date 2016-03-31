(function(){
    'use strict';

    var controllerModule = angular.module('controllerModule');

    // ItemController.$inject = ['$scope', '$controller', '$window', '$http'];
    controllerModule.controller('ItemController', ['$scope', '$rootScope' ,'$controller', '$window', '$http', '$routeParams', '$cookieStore', '$location', ItemController]);

    function ItemController($scope, $rootScope, $controller, $window, $http, $routeParams, $cookieStore,$location) {

    	$scope.item;
    	$scope.itemId;
    	$scope.ProductToAdd = 1;

        $scope.getFunc = function getItem() {
            var globals = $cookieStore.get('app-data');
            if(!globals){
                 $location.path('/login');
                 return;
            }

        	$scope.itemId = $routeParams.id;
            $http({method: 'GET', url: 'http://localhost:8080/item/'+$scope.itemId + '?sid=' + globals.currentSession.sid})
            .then(function(response) {
                $scope.item = response.data;
            }, function(response){$scope.item = "error"});
        };

        $scope.getFunc();

        $scope.addToCart = function addItem() {
        	$scope.cart = $cookieStore.get('cart');
        	$scope.cart.push({id: $scope.itemId, quantity: $scope.ProductToAdd});
            console.log($scope.ProductToAdd);
        	$cookieStore.put('cart', $scope.cart);
            console.log($scope.cart);
        };


    }
})();