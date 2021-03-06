angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicPlatform){
	
	$ionicPlatform.ready(function() {

		$cordovaGeolocation.getCurrentPosition({
			timeout:10000,
			enableHighAccuracy:true
		}).then(function(position) {

			console.log(position);
			var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			var mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

			google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
				var marker = new google.maps.Marker({
				    map: $scope.map,
				    animation: google.maps.Animation.DROP,
				    position: latLng
				});      
			 
				var infoWindow = new google.maps.InfoWindow({
			      	content: "Here I am!"
			  	});
			 
				google.maps.event.addListener(marker, 'click', function () {
				   	infoWindow.open($scope.map, marker);
				});
			});

		
		}, function(error) {

            console.log(error);

		});
	})
})






