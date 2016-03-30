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
                $location.path('/login');
                if(respounse.data == ""){
                    window.alert("Login failed!")
                } else {
                    $rootScope.globals = {
                        currentSession: respounse.data
                    };
                    console.log($rootScope.globals.currentSession.sid)
                    //$cookieStore.put('app-data', $rootScope.globals);
                }
            });
        }
    }
})();