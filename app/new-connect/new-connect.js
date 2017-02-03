'use strict';

angular.module('myApp.newConnect', ['ngRoute', 'myApp.ConnectService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create-connect', {
    templateUrl: 'new-connect/new-connect.html',
    controller: 'NewConnectCtrl'
  });
}])




.controller('NewConnectCtrl', function($scope, $routeParams, Connect) {
	//$scope.test = "testing scope";
 // var res = Connect.getConnects();
 $scope.connect = {};

$scope.categories = [];

  console.log("get categories");

Connect.getCategories().then(function(categories){

  console.log("categories returned " + categories.length);

  for ( var i =0; i< categories.length; i++){
     $scope.categories.push({"catName": categories[i].attributes.catName, "catId": categories[i].id });
     console.dir(categories[i]);
     console.dir($scope.categories );

  }
  $scope.$apply();


});


 $scope.create = function(connect) {
    //$scope.connect works  too

    var currentUser = Parse.User.current();
    if (currentUser){


      Connect.createConnect(connect, currentUser).then(function(result){
        alert('udpated connection');
      });
    }

    };


}); //end of controller


 
