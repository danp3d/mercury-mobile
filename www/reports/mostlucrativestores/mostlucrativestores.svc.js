angular.module('starter.services')

.factory('mostLucrativeStoresSvc', function ($http, $q, $ionicLoading, baseUrl, accountSvc) {
    var report = null;

    var svc = {};
    svc.getReport = function (type, forceRefresh) {
        type = type || 'monthly';
        if (report && report.type == type && !forceRefresh) {
            var dfd = $q.defer();
            dfd.resolve(report);
            return dfd.promise;
        } else {
            $ionicLoading.show();
            return accountSvc.getUser().then(function (usr) {
                return $http({
                    method: 'GET',
                    url: baseUrl + usr.companies[0] + '/MostLucrativeStores?type=' + type
                });
            }).then(function (res) {
                var raw = res.data.report.items
                report = {
                    type: res.data.report.type,
                    labels: [],
                    data: [[]],
                    series: ['Value']
                };

                raw = raw.slice(0, 10);
                raw.forEach(function (item) {
                    report.labels.push(item.storeID);
                    report.data[0].push(item.value);
                });

                report.raw = raw;

                return report;
            }).finally(function () {
                $ionicLoading.hide();
            });
        }
    };

    return svc;
});
