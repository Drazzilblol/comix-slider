'use strict';

angular.module('comixList').component('comixList', {
    templateUrl: 'comix-list/comix-list.template.html',
    controller: ['$http', function ComixListController($http) {
        var self = this;
        $http.get('phones.json').then(function (res) {

            self.comixes = res.data;
            console.log(res.data)

        });

    }]
});