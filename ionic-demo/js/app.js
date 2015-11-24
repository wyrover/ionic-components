// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
    .factory('myapi', function($http, $rootScope, $state) {
        var self = this;
        var endpoint = 'http://localhost:4000/';

        function do_get(entity, params, success_cb, headers) {
            var default_headers = {
                Authorization: 'Basic ' + self.credentials,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
            if (headers != undefined) {
                _.extend(default_headers, headers);
            }
            console.log('headers: ' + default_headers);

            $http({
                method: 'GET',
                url: endpoint + entity,
                params: params,
                headers: default_headers
            }).success(function(data, status, headers, config) {
                if (success_cb != undefined) {
                    success_cb(data);
                }
            }).error(function(data, status, headers, config) {
                console.log(data);
                alert('Invalid username/password test ' + data);
            });
        }
        return {
            get: do_get,
            login: function(username, password) {
                self.credentials = base64_encode(username + ':' + password);
                do_get('User', {}, function(data) {
                    $rootScope.logged_in = true;
                    $rootScope.account = data;
                    $state.go('list');
                });
            },
            logout: function() {
                self.credentials = undefined;
                $rootScope.logged_in = false;
            }
        };
    })

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})


.config(function($stateProvider, $urlRouterProvider /*, $ionicAppProvider*/ ) {

    // $ionicAppProvider.identify({
    //   app_id: '2a73df28',
    //   api_key: 'aa111f60f66b5d87f7e46eb91a788952a6430585b830cdc5'
    // });

    $stateProvider

        .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "LoginCtrl"
    })

    .state('list', {
        url: "/list",
        templateUrl: "templates/list.html",
        controller: "ListCtrl",
    })

    .state('detail', {
        url: "/detail/:id",
        templateUrl: 'templates/detail.html',
        controller: 'DetailCtrl'
    });

    $urlRouterProvider.otherwise('/login');
})