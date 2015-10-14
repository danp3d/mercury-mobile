angular.module('starter.services')

.factory('whatsSellingSvc', function ($http, $q, $ionicLoading, baseUrl, accountSvc) {
    var report = null;

    var svc = {};
    svc.getReport = function (forceRefresh) {
        if (report && !forceRefresh) {
            var dfd = $q.defer();
            dfd.resolve(report);
            return dfd.promise;
        } else {
            $ionicLoading.show();
            return accountSvc.getUser().then(function (usr) {
                return $http({
                    method: 'GET',
                    url: baseUrl + usr.companies[0] + '/WhatsSelling?type=monthly'
                });
            }).then(function (res) {
                var raw = res.data.report.items
                report = {
                    labels: [],
                    tooltips: [],
                    data: [[], []],
                    series: ['Value', 'Quantity']
                };

                raw = raw.slice(0, 10);
                raw.forEach(function (item) {
                    report.labels.push(item.description);
                    report.tooltips.push(item.inventoryCD);
                    report.data[0].push(item.value);
                    report.data[1].push(item.quantity);
                });

                return report;
            }).finally(function () {
                $ionicLoading.hide();
            });
        }
    };

    return svc;
});
