angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('EventsCtrl', function($scope, Events) {
  $scope.events = Events;
  var currentUser = {
    friends: [1]
  };

  $scope.friendsFamily = function(event) {
    return currentUser.friends.some(function(friendId) {
      if (friendId == event.userId) {
        return true;
      }
    })
  }

  $scope.public = function(event) {
    return !event.private && !$scope.friendsFamily(event);
  }

})
.controller('EventCtrl', function($scope, $stateParams, Events) {
   Events.$loaded().then(function() {
     $scope.event = Events.$getRecord($stateParams.eventId);
   });
})
.controller('FriendsListCtrl', function($scope) {
  $scope.friendslist = [
    { title: 'Allison', id: 1 },
    { title: 'Amy', id: 2 },
    { title: 'Rachel', id: 3 },
    { title: 'Derek', id: 4 },
  ];
})

.controller('EventCtrl', function($scope, $stateParams) {
})
.controller('SplashPageCtrl', function($scope, $stateParams) {
})
.controller('ProfileCtrl', function($scope, $stateParams, Users) {
      Users.$loaded().then(function() {
        $scope.user = Users.$getRecord(2);
        console.log($scope.user);
      });
})
.controller('MyCalendarCtrl', function($scope) {
   $scope.mycalendar = [
    { title: 'Soup Kitchen', id: 1 },
    { title: 'Clean the Streets', id: 2 },
    { title: 'Gardening', id: 3 },
  ];
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.factory('Events', function($firebaseArray) {
  var itemsRef = new Firebase("https://good-deed.firebaseio.com/events");
  var Events = $firebaseArray(itemsRef.orderByChild('date'));
  Events.$loaded()
      .then(function(events) {
        events.forEach(function(event) {
          event.maxTotal = 0;
          event.currentTotal = 0;
          event.roles.forEach(function(role) {
            event.maxTotal += role.attendence.max;
            event.currentTotal += role.attendence.current ? role.attendence.current.length : 0;
          });
        });
      });
  return Events;
})
.factory('Users', function($firebaseArray) {
  var itemsRef = new Firebase("https://good-deed.firebaseio.com/users");
  var Users = $firebaseArray(itemsRef);
  Users.$loaded()
      .then(function(users) {
        users.forEach(function(user) {
          //console.log(user);
        });
      });
  return Users;
});
