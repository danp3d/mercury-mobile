angular.module('starter.controllers')

.controller('mostLucrativeStoresCtrl', function ($scope, $filter, mostLucrativeStoresSvc) {
    $scope.showChart = true;
    Chart.defaults.global.tooltipTemplate = function (valueObj) {
        if (valueObj.datasetLabel == 'Value') {
            return valueObj.datasetLabel + ': ' + $filter('currency')(parseFloat(valueObj.value));
        } else {
            return valueObj.datasetLabel + ': ' + parseFloat(valueObj.value).toFixed(2);
        }
    };

    $scope.reload = function (type) {
        mostLucrativeStoresSvc.getReport(type).then(function (report) {
            $scope.report = report;
            $scope.type = report.type;
            if (!report.data || (report.data[0].length < 1)) {
                $scope.tooltips = null;
                $scope.labels = null;
                $scope.data = null;
                $scope.series = null;
            } else {
                $scope.tooltips = report.tooltips;
                $scope.labels = report.labels;
                $scope.data = report.data;
                $scope.series = report.series;
            }
        });
    };

    $scope.reload('monthly');
});
