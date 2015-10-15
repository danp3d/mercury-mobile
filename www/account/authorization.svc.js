angular.module('starter.services')

.factory('authInterceptorSvc', function (tokenSvc, $location) {
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

    svc.responseError = function (response) {
        if (response.status === 401) {
            tokenSvc.removeToken();
            $location.path('/login');
            return response;
        }
    };

    return svc;
});
