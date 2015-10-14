angular.module('starter.services')

.factory('authInterceptorSvc', function (tokenSvc) {
    var svc = {};

    svc.request = function (config) {
        if (tokenSvc.isValidToken()) {
            config.headers.Authorization = "Bearer " + tokenSvc.getToken().accessToken;
        }

        return config;
    };

    svc.response = function (response) {
        return response;
    };

    return svc;
});
