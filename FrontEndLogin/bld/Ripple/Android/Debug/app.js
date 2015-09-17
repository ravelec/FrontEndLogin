// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'satellizer', 'ui.router'])

    .config(function ($stateProvider, $urlRouterProvider, $authProvider) {

        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = 'http://localhost/clinclin/public/api/auth/login';

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('loginState', {
          url: '/login',
          templateUrl: 'views/loginpage.html',
          controller: 'loginController'
      })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signuppage.html',
            controller: 'signUpController'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeController'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
        
});