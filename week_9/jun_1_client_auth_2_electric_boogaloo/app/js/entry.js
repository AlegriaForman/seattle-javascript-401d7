const angular = require('angular');
const demoApp = angular.module('demoApp', [require('angular-route')]);

require('./services')(demoApp);
require('./bears')(demoApp);
require('./auth')(demoApp);

demoApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/bears', {
      templateUrl: 'templates/bears/views/bears_view.html',
      controller: 'BearsController',
      controllerAs: 'bearsctrl'
    })
    // AUTH_EXP: how do the signin/up routes differ and what is their relationship
    // with one another
    // The routes determine which controller is used, either the 'signup' controller or 
    // the 'signin' controller when the '.when' statements resolve. They both have an authenticate
    // function but the 'signin' is a GET request that sends the username and password in 
    // the request header and the 'signup' is a POST request. When the server responds, both will
    // call saveToken() and getUsername(), then the client will be directed to the '/bears' route.
    .when('/signup', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authctrl'
    })
    .when('/signin', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignInController',
      controllerAs: 'authctrl'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);
