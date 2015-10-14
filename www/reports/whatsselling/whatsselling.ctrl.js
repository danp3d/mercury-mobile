angular.module('starter.controllers')

.controller('whatsSellingCtrl', function ($scope, whatsSellingSvc) {
    whatsSellingSvc.getReport().then(function (report) {
        $scope.labels = report.labels;
        $scope.series = report.series;
        $scope.data = report.data;
    });
});
