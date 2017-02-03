
'use strict';

angular.module('myApp.signup', ['ngRoute', 'myApp.ConnectService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'auth/signup.html',
    controller: 'SignupCtrl'
  });
}])


.controller('SignupCtrl', function($scope, $routeParams, Connect) {
	//$scope.test = "testing scope";
 // var res = Connect.getConnects();
 $scope.connect = {};

 $scope.signup = function(user) {
    //$scope.connect works  too

    console.log("userprinted");
    console.dir(user);

      Connect.signup(user).then(function(result){
        alert('Successfully Registered.');
      });

    };


}); //end of controller


 
