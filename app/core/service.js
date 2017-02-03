

 angular.module('myApp.ConnectService' ,[] )
.service('Connect', function ($q) {
	
	
this.getConnectDetail = function (connectId) {

	var Connect = Parse.Object.extend("RoloConnects");
	var query = new Parse.Query(Connect);

    
	//query.equalTo('objectId', connectId);
	return	query.get( connectId, {

		success: function(connect){

		//alert('connect id passed' + connectId);
		//console.dir(connect);

		return connect;
		},
		error: function(error){
			alert("error " + error);

		}

	});

};

this.createCategory = function(newCat, currentUser){

	var category = Parse.Object.extend('RoloCategories');
	var cat = new category();

	cat.set("userPtr", currentUser);
	cat.set("catName", newCat["catName"]);

	return cat.save(null, {

		success: function(res){
			return true;
		}
	});



};

this.deleteCategory = function(category, currentUser){

	var Category = Parse.Object.extend('RoloCategories');
	var query = new Parse.Query(Category);

	return query.get( category.catId, {


		success: function(cat){
			cat.destroy({

				success: function(res){
					console.log("deleted:");
					//return true;

				}
			}).then(x => {return true ; });
			


		},
		error: function(error){
			console.log("error "+ error);

		}
	});




}

this.saveConnect = function(connectId, user) {


	//query for user
	var Connect = Parse.Object.extend("RoloConnects");
	var query = new Parse.Query(Connect);

	return query.get(connectId , {

		success: function(connect){

			connect.set("connectName", user["connectName"]);
			connect.set("connectPhone", user["connectPhone"]);
			connect.set("contactInterval", user["contactInterval"]);
			connect.set("lastContact", user["lastContact"]);

			connect.save(null, {
				success: function(obj){
					console.log("saved connect");
					return true;
				},
				error: function(error){

					console.log("failed" + String(error));
					return false;
				}
			});
		}
	});
}; 



this.signup = function(newUser){
	var user = new Parse.User();

	//console.dir("user in signup service ");
	//console.dir( user);

	user.set("username", newUser["username"]);
	user.set("password", newUser["password"]);
//	user.set("name", user["name"]);

	return user.signUp(null, {
		success: function(user){
			return true;
		},
		error: function(user, error) {
			alert(error);
			console.dir(error);
			return false;
		}
	});
};


this.login = function(user){


	return Parse.User.logIn (user["username"], user["password"], {
		success: function(user){
			return true;
		},
		error: function(user, error) {
			alert(error);
			return false;
		}
	});
};



this.createConnect = function(user, currentUser) {


	//query for user
	var Connect = Parse.Object.extend("RoloConnects");
	var connect = new Connect();
	connect.set("connectName", user["connectName"]);
	connect.set("connectPhone", user["connectPhone"]);
	connect.set("contactInterval", user["contactInterval"]);
	connect.set("lastContact", user["lastContact"]);
	connect.set("userRoot", currentUser);
	
	//get category and set pointer

	var Category = Parse.Object.extend('RoloCategories');
	var query = new  Parse.Query(Category);

	query.equalTo('userPtr', currentUser);
	console.log("connectCategory: " + user["connectCategory"]["catName"]);
	console.dir(user["connectCategory"]);


	query.equalTo('catName', user["connectCategory"]["catName"]);


	return query.first(  {
		success: function(cat){
			connect.set('connectCategory', cat );

			return connect.save(null, { success: function(obj){ console.log("saved connect");
					return true;
				},

				error: function(error){

					console.log("failed" + String(error));
					return false;
				}
			});	

		},
		error: function(error){
			return connect.save(null, { 
				success: function(obj){ console.log("saved connect on error of category");
					return true;
				},

				error: function(error){

					console.log("failed" + String(error));
					return false;
				}
			});	

		}
	});

	//TODO:///get current user and set as user root. *****
}; 





	this.getCategories = function() {


		var RoloCategories = Parse.Object.extend("RoloCategories");
		var query = new Parse.Query(RoloCategories);

		var currentUser = Parse.User.current();

		query.equalTo('userPtr', currentUser);
		

		return query.find( {
			success: function(categories){
				return categories;

			resolve(categories);

			},
			error: function(error){
				alert('error finding category');
									

			}
		});


	};



	this.getConnects = function() {
		//moment().format();
		var myUser = Parse.Object.extend("RoloUsers");
		var userQuery = new Parse.Query(myUser);

		var currentUser = Parse.User.current();
		


		

		/*userQuery.equalTo('userName', 'ethand320');
     
		return userQuery.first({

			success: function(user){
		
               return user;
				
			},
			error: function(error){
				consol.log("no user found" + error );
				return "no suer found";


			}
		}).then(function(resultsUser) */
	
		 return $q(function(resolve, reject) {
		if (currentUser){
		//	alert("currentUser found");
		//	console.dir(currentUser);


 			var UserConnects = Parse.Object.extend("RoloConnects");
                
			var query = new Parse.Query(UserConnects);

			query.equalTo('userRoot',  currentUser);


			query.equalTo('alerting', true);

			return query.find({
					success: function(connects){
						//return connects;
					//	alert(' successful query for connects');
						resolve(connects );
						
						//doesn't get run for now.
						for (var i =0; i < connects.length; i++){


			
							console.log(connects[i].get('contactName'));
							console.log( 'in connects loop');
						}
						resolve(connects);



					},
					error: function(error){
						//return "error in query.find";
						alert('error querying for all connects');

						reject(error);
						console.log("nothing returned second query");
					}
					
				});
		}//end if currentUser
		else {
			alert('currentUser not found');
			return false;

		}
	});
//	return "connect object";
	}; // this getConnects 

}); //end service.


/*

gameScore.set("score", 1111);
gameScore.set("playerName", "Ethan Drower");
gameScore.set("cheatMode", false);

gameScore.save(null, {
  success: function(gameScore) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + gameScore.id);
  },
  error: function(gameScore, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
  }
}); */

