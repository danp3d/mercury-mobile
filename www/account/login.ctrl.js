angular.module('starter.controllers')

.controller('loginCtrl', function ($scope, $state, $ionicLoading, accountSvc) {
    $scope.login = function (email, pass) {
        if (!email || !pass) {
            $ionicLoading.show({
                template: 'Email and Password are mandatory',
                noBackdrop: true,
                duration: 2000
            });
            return null;
        }

        accountSvc.login(email, pass).then(function (res) {
            if (res) {
                $state.go('tab.dash');
            } else {
                $ionicLoading.show({
                    templae: 'Login failed',
                    noBackdrop: true,
                    duration: 2000
                });
            }
        });
    };
});
