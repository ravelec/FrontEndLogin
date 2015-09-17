angular.module('app.controllers', ['app.services'])

.controller('loginController', function ($scope, authService) {

    $scope.doLogin = function () {

        credentials = {
            email: $scope.log.username,
            password: $scope.log.pass
        }

        $scope.log = {
            username: '',
            pass: ''
        };

        authService.login(credentials);
    }

})
.controller('signUpController', function ($scope, authService) {

    $scope.doRegister = function () {

        credentials = {
            name: $scope.reg.name,
            email: $scope.reg.email,
            pass: $scope.reg.pass,
            cPass: $scope.reg.cPass
        }

        $scope.reg = {
            name: '',
            email: '',
            pass: '',
            cPass: '',
        };

        authService.signup(credentials);
    }
})
.controller('homeController', function ($scope, authService) {

    $scope.logout = function () {

        authService.logout();
    }

});
