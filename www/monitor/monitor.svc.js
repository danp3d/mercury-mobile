angular.module('starter.services')

.factory('monitorSvc', function ($http, $q, $ionicLoading, baseUrl, accountSvc) {
    var monitor = null;

    var svc = {};
    svc.getMonitors = function (forceRefresh) {
        if (monitor && !forceRefresh) {
            var dfd = $q.defer();
            dfd.resolve(monitor);
            return dfd.promise;
        } else {
            $ionicLoading.show();
            return accountSvc.getUser().then(function (usr) {
                return $http({
                    method: 'GET',
                    url: baseUrl + usr.companies[0] + '/StoreMonitor'
                });
            }).then(function (res) {
                monitor = res.data.monitors;
                return monitor;
            }).finally(function () {
                $ionicLoading.hide();
            });
        }
    };

    svc.getMonitor = function (storeID) {
        return svc.getMonitors().then(function (monitors) {
            for (var i = 0; i < monitors.length; i++) {
                if (monitors[i].storeID == storeID) {
                    return monitors[i];
                }
            }

            return null;
        });
    };

    return svc;
});
