'use strict';

angular.
module('app').
config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/comixes', {
            template: '<comix-list></comix-list>'
        }).
        when('/comixes/:comixId', {
            template: '<slider></slider>'
        }).
        otherwise('/comixes');
    }
]);