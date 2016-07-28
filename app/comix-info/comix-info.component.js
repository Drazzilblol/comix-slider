'use strict';

angular.module('comixInfo').component('comixInfo', {
    templateUrl: 'comix-info/comix-info.template.html',
    controller: ['$routeParams', '$scope', '$http',
        function SliderController($routeParams, $scope, $http) {


            $http.get('http://localhost:3000/comix/' + $routeParams.comixId).then(function (res) {
                console.log($routeParams);
                $scope.comix = res.data;
            });
        }
    ]
});