/// <reference path="../angular.js" />
var LoginModule = angular.module('MyAngularApp',[]);
var LoginController = function ($scope, LoginService) {
    $scope.isLoggedIn = false;
    $scope.Message = '';
    $scope.Submitted = false;
    $scope.isFormValid = false;
    //Below We're Creating A new Object
    $scope.LoginData =
        {
            Username: '',
            Password: ''
        };

    //Check if the form is Valid// Here f1 is our form name
    $scope.$watch('f1.$valid', function (newVal) {
        $scope.isFormValid = newVal;
    });

    $scope.Login = function () {
        $scope.Submitted = true;
        if ($scope.IsFormValid) {
            LoginService.GetUser($scope.LoginData).then(function (d) {
                if (d.data.Username != null) {
                    $scope.isLoggedIn = true;
                    $scope.Message = "Successfully login done. Welcome " + d.data.Fullname;

                }
                else {
                    alert('Invalid Credential!');
                }
            });
        }
    };


}

LoginModule.controller('LoginController', LoginController).factory('LoginService', function ($http) {
    var fac = {};
    fac.GetUser = function (d) {
        return $http({
            url: '/Data/UserLogin',
            method: 'POST',
            data: JSON.stringify(d),
            headers: { 'content-type': 'application/json' }
        });
    };
    return fac;
});


 

           