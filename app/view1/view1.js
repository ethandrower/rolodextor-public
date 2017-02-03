'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.ConnectService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, Connect) {
	$scope.test = "testing scope";
 // var res = Connect.getConnects();

 $scope.userCategories = [{"catId": undefined, "catName": "Show All"} , {"catId" : "2" , "catName" :"cat2"} ];
//need service call to receive.   id,  a name, 

Connect.getCategories().then(function(categories){

  for ( var i =0; i< categories.length; i++){
     $scope.userCategories.push({"catName": categories[i].attributes.catName, "catId": categories[i].id });
     console.dir(categories[i]);
     console.dir($scope.userCategories );

  }



});


 
  $scope.logout = function(){
    Parse.User.logOut();
    $scope.connections = {};
    
    //   $scope.$apply();
  //var currentUser = Parse.User.current();  // this will now be null
  };


Connect.getConnects().then(function(result){
    alert('res is ' + result );
    var names = [];
    for (var i = 0; i < result.length; i++){
      names.push({"attributes": result[i].attributes, "id": result[i].id , "catId": result[i].attributes.connectCategory.id });
    //  $scope.userCategories.push( {"title" : result[i].categoryName });
    console.dir(names);

    //  names.push({"attributes": result[i].attributes, "id": result[i].id , "title": "cat2" });

    }
  //  $scope.obj = result[0].id;

    $scope.connections = names;

    $scope.$apply();
     console.dir(result);
    return result;

  },  function(reason) {
  alert('Failed: ' + reason);
    }
  );

});