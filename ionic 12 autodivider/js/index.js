angular.module('ionic.ion.autoListDivider',[])

.directive('autoListDivider', function($timeout) {  
	var lastDivideKey = "";

	return {
		link: function(scope, element, attrs) {
			var key = attrs.autoListDividerValue;

			var defaultDivideFunction = function(k){
				return k.slice( 0, 1 ).toUpperCase();
			}
      
			var doDivide = function(){
				var divideFunction = scope.$apply(attrs.autoListDividerFunction) || defaultDivideFunction;
				var divideKey = divideFunction(key);
				
				if(divideKey != lastDivideKey) { 
					var contentTr = angular.element("<div class='item item-divider'>"+divideKey+"</div>");
					element[0].parentNode.insertBefore(contentTr[0], element[0]);
				}

				lastDivideKey = divideKey;
			}
		  
			$timeout(doDivide,0)
		}
	}
});

angular.module('ionicApp', ['ionic','ionic.ion.autoListDivider'])

.factory('PersonService', function($http){
	var BASE_URL = "http://api.randomuser.me/";
	var items = [];
	
	return {
		GetFeed: function(){
			return $http.get(BASE_URL+'?results=30').then(function(response){
				items = response.data.results;
				return items;
			});
		}
	}
})
.controller('MyCtrl', function($scope, $timeout, PersonService) {
  $scope.items = [];
  
  PersonService.GetFeed().then(function(items){
    items.sort(function(a,b){
      var textA = a.user.name.first.toUpperCase();
      var textB = b.user.name.first.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
    
    /*
    items.sort(function(a,b){
      var textA = a.user.gender.toUpperCase();
      var textB = b.user.gender.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })*/
    
    $scope.dividerFunction = function(key){
      return key;
    }
    
	$scope.items = items;
  });
  
});