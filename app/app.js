'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.ConnectService',
   'myApp.connectDetail',
   'myApp.newConnect',
   'myApp.signup',
   'myApp.login',
   'myApp.home',
   'myApp.categories'
   
   
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
Parse.initialize("username","password");
 Parse.serverURL = 'https://parse-server-yourdomain.com/parse'

 
