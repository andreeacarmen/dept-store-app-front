(function(){
    'use strict';

    var controllerModule = angular.module('controllerModule');

    // CartController.$inject = ['$scope', '$controller', '$window', '$http'];
    controllerModule.controller('CartController', ['$scope', '$rootScope', '$controller', '$window', '$http', '$routeParams', '$cookieStore', '$location', CartController]);

    function CartController($scope, $rootScope ,$controller, $window, $http, $routeParams, $cookieStore,$location) {
        $scope.orderedProducts = {} ;
        $scope.getCart = function getProducts() {
            $scope.orderedProducts = $cookieStore.get('cart');  
        }();
        
        $scope.sendOrder = function(){
            $http({url: 'http://localhost:8080/order?sid=' + $rootScope.globals.currentSession.sid, method: "GET", data : $scope.orderedProducts
            }).then(function(respounse){
                if(respounse.data == ""){
                    $scope.loginError =  true;
                } else {
                    $rootScope.globals = {
                        currentSession: respounse.data
                    };
                    $location.path('/query');

                    $scope.cart = [];
                    $cookieStore.put('cart', $scope.cart);
                    //$window.location.href = '/query';
                    console.log($rootScope.globals.currentSession.sid)
                    
                    $cookieStore.put('app-data', $rootScope.globals);
                }
            });
        }
        /*
        $scope.sendOrder = function(){
            $http.post('http://localhost:8080/order' + $rootScope.globals.currentSession.sid , JSON.stringify({
                $scope.orderedProducts;
            })).then(function(respounse){
                if(respounse.data == ""){
                    $scope.loginError =  true;
                } else {
                    $rootScope.globals = {
                        currentSession: respounse.data
                    };
                    $location.path('/query');

                    $scope.cart = [];
                    $cookieStore.put('cart', $scope.cart);
                    //$window.location.href = '/query';
                    console.log($rootScope.globals.currentSession.sid)
                    
                    $cookieStore.put('app-data', $rootScope.globals);
                }
            });
        }*/
    }
})();