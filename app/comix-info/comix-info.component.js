'use strict';

angular.
module('comixInfo').
component('comixInfo', {
    templateUrl: 'comix-info/comix-info.template.html',
    controller: ['$routeParams', '$scope', '$http',
        function SliderController($routeParams, $scope, $http) {


            $http.get('http://localhost:3000/comix/' + $routeParams.comixId).then(function (res) {
                $scope.comix = res.data;
                console.log(res.data)
            });


            /*   $scope.comix = Number.get({comixId: $routeParams.comixId}, function(comix) {
             $scope.setImage(comix.images[0]);
             });

             self.setImage = function setImage(imageUrl) {
             self.mainImageUrl = imageUrl;
             };*/
        }
    ]
});