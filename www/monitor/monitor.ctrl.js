angular.module('starter.controllers')

.controller('monitorCtrl', function ($scope, monitors) {
    $scope.monitors = monitors.sort(function (a, b) {
        return parseFloat(a.storeID) >= parseFloat(b.storeID);
    });
});
