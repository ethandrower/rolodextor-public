//login.js


'use strict';

angular.module('myApp.login', ['ngRoute', 'myApp.ConnectService'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'auth/login.html',
		controller: 'LoginCtrl'
	});


}])

.controller('LoginCtrl', function($scope, Connect, $location){

  $scope.user = {};





  $scope.login = function(user){


  	Connect.login(user).then( function(result){

  		alert('logged in ');
  		//redirect to home somehow...

  		//$scope.go = function ( path ) {

  		$location.path( '/view1' );

	 });

  };
 




});