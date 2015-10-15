// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'chart.js'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.constant("baseUrl", "http://ExobizServer1.cloudapp.net:3366/")

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('login', {
        url: '/login',
        templateUrl: 'account/login.html',
        controller: 'loginCtrl'
    })

    .state('logout', {
        url: '/logout',
        onEnter: function ($state, accountSvc) {
            accountSvc.logout();
            $state.go('login');
        }
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        onEnter: function ($state, accountSvc) {
            if (!accountSvc.isLoggedIn())
                $state.go('login');
        }
    })

    // Each tab has its own nav history stack:
    .state('tab.monitor', {
            url: '/monitor',
            abstract: true,
            views: {
                'tab-monitor': {
                    templateUrl: 'monitor/monitor.html'
                }
            }
        })
        .state('tab.monitor.list', {
            url: '/list',
            views: {
                'tab-monitor@tab': {
                    templateUrl: 'monitor/monitor-list.html',
                    controller: 'monitorCtrl',
                    resolve: {
                        monitors: function (monitorSvc) {
                            return monitorSvc.getMonitors();
                        }
                    }
                }
            }
        })
        .state('tab.monitor.details', {
            url: '/:storeID',
            views: {
                'tab-monitor@tab': {
                    templateUrl: 'monitor/monitor-details.html',
                    controller: 'monitorDetailsCtrl',
                    resolve: {
                        monitor: function (monitorSvc, $stateParams) {
                            return monitorSvc.getMonitor($stateParams.storeID);
                        }
                    }
                }
            }
        })

    .state('tab.report', {
            url: '/report',
            abstract: true,
            views: {
                'tab-report': {
                    templateUrl: 'reports/report.html'
                }
            }
        })
        .state('tab.report.list', {
            url: '/list',
            views: {
                'tab-report@tab': {
                    templateUrl: 'reports/report-list.html'
                }
            }
        })
        .state('tab.report.whatsselling', {
            url: '/whatsselling',
            views: {
                'tab-report@tab': {
                    templateUrl: 'reports/whatsselling/whatsselling.html',
                    controller: 'whatsSellingCtrl'
                }
            }
        })
        .state('tab.report.mostlucrativestores', {
            url: '/mostlucrativestores',
            views: {
                'tab-report@tab': {
                    templateUrl: 'reports/mostlucrativestores/mostlucrativestores.html',
                    controller: 'mostLucrativeStoresCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/report/list');
    $httpProvider.interceptors.push('authInterceptorSvc');
});
