'use strict';

angular.module('comixList').component('comixList', {
    templateUrl: 'comix-list/comix-list.template.html',
    controller: ['$http', '$scope', function ComixListController($http, $scope) {
        var self = this;
        $http.get('http://localhost:3000/comix').then(function (res) {
            $scope.comixes = res.data;
            console.log(res.data)
        });

        $scope.addComix = function(comixUrl) {
            var data = {
                'comixUrl': comixUrl
            };
            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };
            $http.post('http://localhost:3000/comix', data, config).then(function (res) {
                $scope.comixes.push(res.data);
                console.log(res.data)
            });
        };
    }]
});