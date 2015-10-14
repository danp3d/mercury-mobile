angular.module('starter.services')

.factory('accountSvc', function ($http, $window, $q, baseUrl, tokenSvc) {
    var usr = null;
    var svc = {};
    svc.login = function (email, pass) {
        return $http({
            "method": 'POST',
            "url": baseUrl + 'login',
            "data": {
                "email": email,
                "password": pass
            }
        }).then(function (res) {
            if (res.data.status == 'connected') {
                tokenSvc.setToken({
                    accessToken: res.data.accessToken,
                    expiresOn: res.data.expiresOn
                });
                return true;
            }

            tokenSvc.removeToken();
            return false;
        });
    };

    svc.logout = function () {
        tokenSvc.removeToken();
    };

    svc.isLoggedIn = function () {
        return tokenSvc.isValidToken();
    };

    svc.getUser = function () {
        if (usr) {
            var dfd = $q.defer();
            dfd.resolve(usr);
            return dfd.promise;
        } else {
            return $http({
                method: 'GET',
                url: baseUrl + 'info'
            }).then(function (res) {
                usr = {
                    name: res.data.name,
                    companies: res.data.companies
                };
                return usr;
            });
        }
    };

    return svc;
});
