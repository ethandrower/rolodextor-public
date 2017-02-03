'use strict';

angular.module('myApp.connectDetail', ['ngRoute', 'myApp.ConnectService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/connectdetail/:connectid', {
    templateUrl: 'connect-detail/connect-detail.html',
    controller: 'ConnectDetailCtrl'
  });
}])




.controller('ConnectDetailCtrl', function($scope, $routeParams, Connect) {
	//$scope.test = "testing scope";
 // var res = Connect.getConnects();
 $scope.connect = {};
 $scope.connect.name = "prepopname";

 var connectId = $routeParams.connectid;
                
  Connect.getConnectDetail( $routeParams.connectid ).then(function(result){
    alert('res deis' + result );
    
    $scope.connect = result.attributes;
   // console.dir(result);

   // $scope.connections = names;
    $scope.$apply();


   

  });

 $scope.update = function() {

      Connect.saveConnect(connectId, $scope.connect ).then(function(result){
        alert('udpated connection');
      });

    };


}); //end of controller


 
