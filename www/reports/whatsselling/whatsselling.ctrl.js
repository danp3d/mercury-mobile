angular.module('starter.controllers')

.controller('whatsSellingCtrl', function ($scope, whatsSellingSvc) {
    $scope.showChart = true;
    Chart.defaults.global.multiTooltipTemplate = function (valueObj) {
        var newLbl = $scope.tooltips[$scope.labels.indexOf(valueObj.label)];
        valueObj.label = newLbl || valueObj.label;
        if (valueObj.datasetLabel == 'Value') {
            return valueObj.datasetLabel + ': $' + parseFloat(valueObj.value).toFixed(2);
        } else {
            return valueObj.datasetLabel + ': ' + parseFloat(valueObj.value).toFixed(2);
        }
    };

    $scope.reload = function (type) {
        whatsSellingSvc.getReport(type).then(function (report) {
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
