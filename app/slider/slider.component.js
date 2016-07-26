'use strict';

angular.module('slider').component('slider', {
    templateUrl: 'slider/slider.template.html',
    controller: ['$routeParams', '$scope', '$http',
        function SliderController($routeParams, $scope, $http) {


            $http.get('http://localhost:3000/number/' + $routeParams.numberId).then(function (res) {
                $scope.number = res.data;
                console.log(res.data)
            });


            $scope.addComix = function (comixName, numberName) {
                var data = {
                    'comixId': $routeParams.comixId,
                    'comixName': comixName,
                    'numberName': numberName
                };
                var config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                $http.post('http://localhost:3000/number', data, config).then(function (res) {
                    $scope.number.push(res.data);
                    console.log(res.data)
                });
            };


            /*   $scope.comix = Number.get({comixId: $routeParams.comixId}, function(comix) {
             $scope.setImage(comix.images[0]);
             });

             self.setImage = function setImage(imageUrl) {
             self.mainImageUrl = imageUrl;
             };*/
        }
    ]
});