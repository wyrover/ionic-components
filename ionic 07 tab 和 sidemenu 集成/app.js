var app = angular.module('myApp', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tabs', {
            url: '/tab',
            controller: 'TabsCtrl',
            templateUrl: 'tabs.html'
        })
        .state('tabs.home', {
            url: '/home',
            views: {
                'home-tab': {
                    templateUrl: 'home.html',
                    controller: 'HomeTabCtrl'
                }
            }
        })
        .state('tabs.settings', {
            url: '/settings',
            views: {
                'settings-tab': {
                    templateUrl: 'settings.html'
                }
            }
        })
        .state('about', {
            url: '/about',
            controller: 'AboutCtrl',
            templateUrl: 'about.html'
        });

    $urlRouterProvider.otherwise('/tab');
});

app.controller('TabsCtrl', function($scope, $ionicSideMenuDelegate) {

    $scope.openMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    }

});

app.controller('HomeTabCtrl', function($scope, $ionicSideMenuDelegate) {

});

app.controller('AboutCtrl', function($scope, $ionicSideMenuDelegate) {
    $scope.openMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    }
});