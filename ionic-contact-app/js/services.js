angular.module('starter.services', [])


.factory('FirebaseService', function() {
	var ref = new Firebase('https://ioniccontact.firebaseio.com');
	return ref;
})














