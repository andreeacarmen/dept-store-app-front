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
            .when('/query',{
                templateUrl: 'Templates/query.html',
                controller: 'QueryController'
            })
            .when('/item/:id',{
                templateUrl: 'Templates/item.html',
                controller: 'ItemController'
            })
            .when('/cart',{
                templateUrl: 'Templates/cart.html',
                controller: 'CartController'
            })
            .when('/about',{
                templateUrl: 'Templates/about.html'
            })
            .when('/finalize',{
                templateUrl: 'Templates/finalize.html'
            })
            .when('/error', {
                templateUrl: 'Templates/notfound.html'
            })
            .otherwise({
                redirectTo: '/error'
            })

    }])
    
    app.run(['$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('app-data') || {};

        if($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.token;
        }

        if(!$rootScope.globals.currentSession){
            $location.path('/login');
        } else {
            $location.path('/query');
        }
/*
        if ($rootScope.globals.currentUser && ($location.path() === '/login' )) {
            $location.path('/');
            $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.token;
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
*/
    }]);

})();