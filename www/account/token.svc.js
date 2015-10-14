angular.module('starter.services')

.factory('tokenSvc', function ($window) {
    var accessToken = undefined;
    var svc = {};
    svc.setToken = function (token) {
        accessToken = token;
        $window.localStorage.setItem("mercuryAccessToken", JSON.stringify(token));
    };

    svc.getToken = function () {
        if (accessToken)
            return accessToken;

        return JSON.parse($window.localStorage.getItem("mercuryAccessToken"));
    };

    svc.isValidToken = function () {
        var tkn = svc.getToken();
        return (tkn && tkn.accessToken && tkn.expiresOn && (Date.now() < new Date(tkn.expiresOn)));
    };

    svc.removeToken = function () {
        $window.localStorage.removeItem("mercuryAccessToken");
    };

    return svc;
});
