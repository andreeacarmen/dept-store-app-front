(function(){
    'use strict';

    var controllerModule = angular.module('controllerModule');

    // CartController.$inject = ['$scope', '$controller', '$window', '$http'];
    controllerModule.controller('CartController', ['$scope', '$rootScope', '$controller', '$window', '$http', '$routeParams', '$cookieStore', '$location', CartController]);

    function CartController($scope, $rootScope ,$controller, $window, $http, $routeParams, $cookieStore,$location) {
        var globals = $cookieStore.get('app-data');
        if(!globals){
            $location.path('/login');
            return;
        }

        $scope.orderedProducts = {} ;
        $scope.getCart = function getProducts() {
            $scope.orderedProducts = $cookieStore.get('cart');  
        }();
        
        $scope.sendOrder = function(){
            var globals = $cookieStore.get('app-data');
            if(!globals){
                $location.path('/login');
                return;
            }
            $http({url: 'http://localhost:8080/order?sid=' + globals.currentSession.sid, method: "POST", data : $scope.orderedProducts
            }).then(function(respounse){
                if(respounse.data == ""){
                    $scope.loginError =  true;
                } else {
                    $rootScope.globals = {
                        currentSession: respounse.data
                    };
                    $location.path('/finalize');

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