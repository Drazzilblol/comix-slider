'use strict';

angular.module('slider').component('slider', {
    templateUrl: 'slider/slider.template.html',
    controller: ['$routeParams', '$scope', '$http',
        function SliderController($routeParams, $scope, $http) {

            $('.rg-image-wrapper').focus();

            $http.get('http://localhost:3000/number/' + $routeParams.comixId + "/" + $routeParams.numberId).then(function (res) {
                $scope.number = res.data;
                console.log(res.data)
            });

            $scope.Index = 0;

            $scope.next = function () {
                $('.rg-image-wrapper').focus();
                if ($scope.Index < $scope.number.pages.length) {
                    $scope.Index++;
                }
            };

            $scope.preview = function () {
                $('.rg-image-wrapper').focus();
                if ($scope.Index > 0) {
                    $scope.Index--;
                }
            };

            $scope.key = function ($event) {
                if ($event.keyCode == 39)
                    $scope.next()
                else if ($event.keyCode == 37)
                    $scope.preview()
            };
        }
    ]
});