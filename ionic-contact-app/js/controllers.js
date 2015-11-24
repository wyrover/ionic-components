angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $firebaseAuth, FirebaseService) {

	var fb = $firebaseAuth(FirebaseService);

	$scope.login = function(user) {

		fb.$authWithPassword(user).then(function (authData) {
			$state.go('menu.profile');
		}).catch(function(error) {
			alert('ERROR : ' + error);
		});
	}

	$scope.register = function(user) {

		fb.$createUser(user).then(function() {
			return fb.$authWithPassword(user)
		}).then(function(authData) {
			console.log(fb.uid);
			profilePath = FirebaseService.child("users").child(authData.uid).child("profile");
			profilePath.set({
				fullname: user.fullname,
				email: user.email,
				mobile: user.mobile,
				created_at: Firebase.ServerValue.TIMESTAMP
			});
			$state.go('menu.profile');
		}).catch(function(error) {
			alert('ERROR : ' + error);
		});
	}
})

.controller('ProfileCtrl', function($scope, $firebaseObject, FirebaseService) {

	var fb = FirebaseService.getAuth();
	var profilePath = FirebaseService.child("users").child(fb.uid).child("profile");

	$scope.init = function() {
		var syncObject = $firebaseObject(profilePath);
		syncObject.$bindTo($scope, "user");
	}
})

.controller('ContactCtrl', function($scope, FirebaseService, $firebaseObject, $state, $stateParams) {

	var fb = FirebaseService.getAuth();
	var contactPath = FirebaseService.child("users").child(fb.uid).child("contacts");


	$scope.createContact = function(contact) {
		contact.created_at = Firebase.ServerValue.TIMESTAMP;
		contactPath.push(contact);
		$state.go('menu.contacts');
	}
})














