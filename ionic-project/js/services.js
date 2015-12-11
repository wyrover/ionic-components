angular.module('starter.services', [])

.factory('FirebaseService', function() {

    var fireRef = new Firebase('https://ioni.firebaseio.com');
    return fireRef;
})