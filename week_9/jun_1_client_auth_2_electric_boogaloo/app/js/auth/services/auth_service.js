var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.factory('cfAuth', ['$http', '$q', function($http, $q) {
    // AUTH_EXP: explain what each of these functions are accomplishing and
    // what data we're storing in this service
    return {
      // The removeToken() is the 'log out' logic. It sets the token, username and
      // the token information that had been stored in the header to null and sets the
      // token that was in local storage equal to an empty string. This effectively forces
      // the user, or another user, to go through the sign-in process again. 
      removeToken: function() {
        this.token = null;
        this.username = null;
        $http.defaults.headers.common.token = null; 
        window.localStorage.token = '';
      },
      // The saveToken() saves the token. Particularly, the '$http.defaults...' will
      // allow us to add the token as a property of the default header config so that
      // it will be included in every http request. It also saves the token in the local storage.
      saveToken: function(token) {
        this.token = token;
        $http.defaults.headers.common.token = token;
        window.localStorage.token = token;
        return token;
      },
      // This function gets the token in the local storage, which persists even when the
      // window is refreshed. It also passes the token to the default header for http requests.
      getToken: function() { 
        this.token || this.saveToken(window.localStorage.token);
        return this.token;
      },
      // This function is a promise that makes a GET request to the API server '/profile' route.
      // When the server responds, the username is either resolved to 'this.username' or the 
      // request is rejected when there's no token associated with the username.
      getUsername: function() {
        return $q(function(resolve, reject) {
          if (this.username) return resolve(this.username);
          if (!this.getToken()) return reject(new Error('no authtoken'));

          $http.get(baseUrl + '/api/profile') 
            .then((res) => {
              this.username = res.data.username;
              resolve(res.data.username);
            }, reject);
        }.bind(this));
      }
    }
  }]);
};
