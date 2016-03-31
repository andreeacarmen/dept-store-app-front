(function(){
    'use strict';

    var controllerModule = angular.module('controllerModule', []).controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$cookieStore', '$location', '$http', '$controller'];

    function LoginController($scope, $rootScope, $cookieStore, $location, $http) {
        $scope.login = function(){
                $http.post('http://localhost:8080/login', JSON.stringify({
                username: $scope.username,
                password: $scope.password
            })).then(function(respounse){
                if(respounse.data == ""){
                    $scope.loginError =  true;
                } else {
                    $rootScope.globals = {
                        currentSession: respounse.data
                    };
                    $location.path('/query');
                    //$window.location.href = '/query';
                    console.log($rootScope.globals.currentSession.sid)
                    
                    //$cookieStore.put('app-data', $rootScope.globals);
                }
            });
        }
    }
})();