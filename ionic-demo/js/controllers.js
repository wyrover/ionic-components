angular.module('starter.controllers', [])

.controller('ListCtrl', function($scope, $state, $ionicHistory, ChatsService, myapi) {
    if (!$scope.logged_in) {
        $state.go('login');
    }
    // ChatsService.all().then(function(chats){
    //        $scope.chats = chat;
    //    });
    console.log(ChatsService.all());
    $scope.chats = ChatsService.all();
    // $scope.remove = function(chat) {
    //     ChatsService.remove(chat);
    // }
    // $ionicHistory.nextViewOptions({
    //     disableBack: true
    // });

    // $state.go('detail');
    $scope.doLogout = function() {
        myapi.logout();
        $state.go('login');
    }
})

.controller('DetailCtrl', function($scope, $state, $stateParams, ChatsService) {
    if (!$scope.logged_in) {
        $state.go('login');
    }
    // $scope.chat = ChatsService.get($stateParams.chatId);

    var chatId = $stateParams.id;
    $scope.chat = ChatsService.get(chatId);
    console.log($scope.logged_in);
})

.controller('LoginCtrl', function($scope, $stateParams, myapi) {
    // $scope.chat = ChatsService.get($stateParams.chatId);
    $scope.doLogin = function() {
        myapi.login(this.username, this.password);
    }
})