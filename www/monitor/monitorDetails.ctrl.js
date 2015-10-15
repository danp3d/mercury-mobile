angular.module('starter.controllers')

.controller('monitorDetailsCtrl', function ($scope, monitor) {
    $scope.monitor = monitor;
    $scope.isOK = function (date) {
        var oneHour = 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date();
        var secondDate = new Date(date);

        var diffHours = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneHour)));

        return diffHours < 12;
    };
    $scope.getClassForDate = function (date) {
        if ($scope.isOK(date))
            return 'ion-checkmark-circled balanced';

        return 'ion-alert-circled assertive';
    };
});
