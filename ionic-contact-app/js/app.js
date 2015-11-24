angular.module('starter', ['ionic', 'firebase', 'starter.services', 'starter.controllers'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('register', {
      url:'/register',
      templateUrl: 'templates/register.html',
      controller: 'LoginCtrl'
    })

    .state('menu', {
      url:'/menu',
      templateUrl:'templates/menu.html',
      abstract: true,
    })

    .state('menu.profile', {
      url:'/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('menu.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacts.html'
        }
      }
    })

    .state('menu.create', {
      url:'/contact/create',
      views: {
        'menuContent': {
          templateUrl: 'templates/contactform.html'
        }
      }
    })



  $urlRouterProvider.otherwise('login')

})

















