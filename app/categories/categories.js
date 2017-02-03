'use strict';

angular.module('myApp.categories', ['ngRoute','myApp.ConnectService'])


.config(['$routeProvider', function($routeProvider){
	
	$routeProvider.when('/categories', {

	templateUrl: 'categories/categories.html',
	controller: 'CatCtrl'
	}); 


}])

.controller('CatCtrl', function($scope, $routeParams, Connect){
	
	
$scope.currentCategories = [];

	
 function getCategories() { 


	Connect.getCategories().then(function(categories){


		for(var i = 0; i < categories.length; i++){


		
			$scope.currentCategories.push({
					"catName": categories[i].attributes.catName,
					"catId": categories[i].id
			 });		
		}

		console.dir($scope.currentCategories);
		$scope.$apply();
		//$scope.$digest();


	});
};
getCategories();


	$scope.deleteCat = function(category) {

		console.log("deleting category");
		console.dir(category);

		
		
			Connect.deleteCategory(category).then( x =>{

		//	$scope.$apply();
			//$scope.$digest();
			console.log("deleted handler in cat.js:)");
			alert('deleted');
			
			getCategories();
				}

			);
		


	};

  $scope.newCat = function(newCat ) {

  	var currentUser = Parse.User.current();

  	if (currentUser){
  		Connect.createCategory(newCat, currentUser).then(function(result){
  			alert('added new category');

  		});
  	}
  	else {
  		alert('You need to be logged in to add categories');


  	}



	

};


}); //end controller




