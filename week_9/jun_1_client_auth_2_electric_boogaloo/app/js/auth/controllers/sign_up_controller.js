var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location',  'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: how does this differ from the sign_in_controller
    // The signup controller will set 'signup' to true which changes
    // the view to show the signup fields and 'Create new user' button. It also makes a
    // 'POST' request to the API server via the '/signup' route. When the request
    // resolves, saveToken() and getUsername() are called effectively authenticating the
    // user and will set the location to the '/bears' route. If it doesn't resolve the
    // 'handleError’ service will return an error message 'Could not create user'.
    this.signup = true;
    this.errors = [];
    this.buttonText = 'Create New User!'
    this.authenticate = function(user) {
      $http.post(baseUrl + '/api/signup', user)
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getUsername();
          $location.path('/bears');
        }, handleError(this.errors, 'Could not create user'));
    };
  }]);
};
