'use strict';
(function(){
    var app = angular.module('app', [
        'controllerModule',
        'ngCookies',
        'ngRoute'
    ]);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/login',{
                templateUrl: 'Templates/login.html',
                controller: 'LoginController'
            })
    }])
    
    app.run(['$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        if($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.token;
        }

        if ($rootScope.globals.currentUser && ($location.path() === '/login' || $location.path() === '/register')) {
            $location.path('/');
            $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.token;
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser && $location.path() !== '/register') {
                $location.path('/login');
            }
        });
    }]);

})();