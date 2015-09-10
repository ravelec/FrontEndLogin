angular.module('app.controllers', [])

.controller('loginController', function ($scope, $state, $http, $auth, $rootScope) {

    $scope.doLogin = function () {
        
        credentials = {
            email: $scope.log.username,
            password: $scope.log.pass
        }
        

        // Use Satellizer's $auth service to login
        $auth.login(credentials)
            .then(function (response) {
                $scope.log = {
                    username: '',
                    pass: ''
                };

                $http.get('http://localhost/clinclin/public/api/auth/user')
                    .success(function (response) {
                        // Stringify the returned data to prepare it
                        // to go into local storage
                        user = JSON.stringify(response.user);

                        // Set the stringified user data into local storage
                        localStorage.setItem('user', user);

                        // The user's authenticated state gets flipped to
                        // true so we can now show parts of the UI that rely
                        // on the user being logged in
                        $rootScope.authenticated = true;

                        // Putting the user's data on $rootScope allows
                        // us to access it anywhere across the app
                        $rootScope.currentUser = response.user;


                    })
                    .error(function (response) {

                    });

                $state.go('home', {});

            })
            .catch(function (response) {
                alert("LOGIN FAILED");
                $scope.log = {
                    username: '',
                    pass: ''
                };
        });
    }

})
.controller('signUpController', function ($scope, $state, $http) {
    

    $scope.doRegister = function () {

      
      $http.post('http://localhost/clinclin/public/api/auth/register', {
            name: $scope.reg.name,
            email: $scope.reg.email,
            password: $scope.reg.pass,
            password_confirmation: $scope.reg.cPass,
            }).
        success(function (response) {
            alert("REGISTRATION SUCCESSFULLY DONE");
            $scope.reg = {
                name: '',
                email: '',
                pass: '',
                cPass: '',
            };
            $state.go('loginState', {});
            
        }).
        error(function (response) {
            
            $scope.reg = {
                name: '',
                email: '',
                pass: '',
                cPass: '',
            };

            alert('REGISTRATION FAILED');
        });

    }
})
.controller('homeController', function ($scope, $state, $http, $rootScope, $auth) {

    $scope.logout = function () {

        $auth.logout().then(function () {

            // Remove the authenticated user from local storage
            localStorage.removeItem('user');

            // Flip authenticated to false so that we no longer
            // show UI elements dependant on the user being logged in
            $rootScope.authenticated = false;

            // Remove the current user info from rootscope
            $rootScope.currentUser = null;
        });
    }

});
