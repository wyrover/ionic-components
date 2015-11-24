angular.module('starter.controllers', [])

.controller('TodoCtrl', function($ionicModal, $state, $scope, FirebaseService, $firebaseObject) {

    var fb = FirebaseService.getAuth();
    var path = FirebaseService.child("users").child(fb.uid).child("todos");

    $ionicModal.fromTemplateUrl('templates/_form.html', function(modal) {
        $scope.modalForm = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });


    $scope.newTodo = function() {

        $scope.todo = "";
        $scope.modalTitle = "New Todo";
        $scope.hideAndSeek = true;
        $scope.modalForm.show();
    }

    $scope.closeModal = function() {
        $scope.modalForm.hide();
    }

    $scope.createTodo = function(todo) {

        $scope.todo = {};
        if (!todo.title.length) {
            return;
        } else {
            path.push({
                title: todo.title,
                created_at: Firebase.ServerValue.TIMESTAMP
            });

            $scope.closeModal();
            todo.title = "";
        }
    }

    $scope.list = function() {

        if (fb) {
            var syncObject = $firebaseObject(path);
            syncObject.$bindTo($scope, "todos");
        } else {
            $state.go('login');
        }
    }

    $scope.removeTodo = function(key) {
        path.child(key).remove();
    }

    $scope.editTodo = function(todo) {

        $scope.modalTitle = "Edit Todo";
        $scope.todo = todo;
        $scope.hideAndSeek = false;
        $scope.modalForm.show();
    }

})

.controller('LoginCtrl', function(FirebaseService, $firebaseAuth, $state, $scope) {

    var fb = $firebaseAuth(FirebaseService);

    $scope.login = function(email, password) {

        fb.$authWithPassword({
            email: email,
            password: password
        }).then(function(authData) {
            $state.go('menu.todo');
        }).catch(function(error) {
            alert('Error : ' + error);
        })
    }

    $scope.register = function(email, password) {

        var obj = {
            email: email,
            password: password
        }

        fb.$createUser(obj).then(function() {
            return fb.$authWithPassword(obj)
        }).then(function(authData) {
            $state.go('menu.todo');
        }).catch(function(error) {
            alert('Error : ' + error);
        })
    }
})

.controller('AppCtrl', function($state, $scope, FirebaseService) {

    $scope.logout = function() {

        FirebaseService.unauth();
        $state.go('login');
    }
})