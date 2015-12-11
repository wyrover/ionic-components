angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {


        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        })
        .state('menu', {
            url: '/menu',
            templateUrl: 'templates/menu.html',
            abstract: true,
            controller: 'AppCtrl'
        })
        .state('menu.todo', {
            url: '/todo',
            views: {
                'menuContent': {
                    templateUrl: 'templates/todo.html',
                    controller: 'TodoCtrl'
                }
            }
        })

    $urlRouterProvider.otherwise('/login');
})