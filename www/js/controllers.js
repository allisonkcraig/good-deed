var currentUser = {
    friends: [1], userId: 2
};

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicHistory, $state, $timeout, Users, $stateParams) {
  
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
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('app.mycalendar');
    $scope.modal.hide();
  };

  $scope.goToProfile = function() {
    $state.go('app.profile');
  }

    Users.$loaded().then(function() {
        $scope.user = Users.$getRecord(currentUser.userId);
    });
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

.controller('EventsCtrl', function($scope, Events, Users) {
  $scope.events = Events;

  $scope.friendsFamily = function(event) {
    return currentUser.friends.some(function(friendId) {
      if (friendId == event.userId) {
        return true;
      }
    })
  }

  $scope.showSignedUp = function(event) {
      return event.roles.some(function(role) {
          if (!role.attendence.current) return false;

          return role.attendence.current.some(function(currentId) {
              if (currentUser.userId === currentId) {
                  return true;
              }
          });
      });
  }

    $scope.maxTotal = function(event) {
        var maxTotal = 0;
        event.roles.forEach(function(role) {
            maxTotal += role.attendence.max;
        });
        return maxTotal;
    };

    $scope.currentTotal = function(event) {
        var currentTotal = 0;
        event.roles.forEach(function(role) {
            currentTotal += role.attendence.current ? role.attendence.current.length : 0;
        });
        return currentTotal;
    };

  $scope.public = function(event) {
    return !event.private && !$scope.friendsFamily(event);
  }

})
.controller('EventCtrl', function($scope, $stateParams, Events, $ionicPopup) {
    Events.$loaded().then(function() {
        $scope.event = Events.$getRecord($stateParams.eventId);
    });

    $scope.showSignedUp = function(role) {
        if (!role.attendence.current) return false;

        return role.attendence.current.some(function(currentId) {
            if (currentUser.userId === currentId) {
                return true;
            }
        });
    }

    $scope.maxTotal = function(event) {
        if (!event) return 0;
        var maxTotal = 0;
        event.roles.forEach(function(role) {
            maxTotal += role.attendence.max;
        });
        return maxTotal;
    };

    $scope.currentTotal = function(event) {
        if (!event) return 0;
        var currentTotal = 0;
        event.roles.forEach(function(role) {
            currentTotal += role.attendence.current ? role.attendence.current.length : 0;
        });
        return currentTotal;
    };

    // A confirm dialog
    $scope.showConfirm = function(role) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Sign up for: ' + $scope.event.title,
            template: '<span style="color:black; font-family: Arvo;">Please confirm your sign up.</span>'
        });
        confirmPopup.then(function(res) {
            if(res) {
                if (!role.attendence.current) {role.attendence.current = []}
                role.attendence.current.push(currentUser.userId);
                Events.$save($scope.event);
            } else {
                //console.log('Cancel');
            }
        });
    };
})
.controller('FriendsListCtrl', function($scope) {
  $scope.friendslist = [
    { title: 'Amy Tsang', id: 0, image: '../img/amy.jpg' },
    { title: 'Rachel Harrigan', id: 1, image: '../img/good-deed-logo.png' },
    { title: 'Derek Hammer', id: 3, image: 'https://avatars2.githubusercontent.com/u/75005?v=3&s=460' }
  ];
})
.controller('SettingsCtrl', function($scope, $stateParams, Users, $state) {
      $scope.goToEdit = function() {  }
      Users.$loaded().then(function() {
        $scope.user = Users.$getRecord(2);
      });

        $scope.saveProfile = function() {
            Users.$save($scope.user);
            $state.go('app.profile');
        }
})
.controller('SplashPageCtrl', function($scope, $stateParams) {
})
.controller('ProfileCtrl', function($scope, $stateParams, Users, $state, Badges) {
      $scope.goToEdit = function() { $state.go('app.settings'); }
      Users.$loaded().then(function() {
        $scope.user = Users.$getRecord(2);
      });
      Badges.$loaded().then(function() {
        $scope.badge = Badges;
        Badges.forEach(function(badge) {
          if (badge.score.max <= $scope.user.counter) {
            $scope.badgeImage = badge.image;
            $scope.badges.push($scope.badgeImage);
          }
        });
      });
      $scope.badges = [];
})
.controller('ProfileAmyCtrl', function($scope, $stateParams, Users, $state, Badges) {
      $scope.goToEdit = function() { $state.go('app.profile-amy'); }
      Users.$loaded().then(function() {
        $scope.user = Users.$getRecord($stateParams.friendId);
      });
      Badges.$loaded().then(function() {
        $scope.badge = Badges;
        Badges.forEach(function(badge) {
          if (badge.score.max <= $scope.user.counter) {
            $scope.badgeImage = badge.image;
            $scope.badges.push($scope.badgeImage);
          }
        });
      });
      $scope.badges = [];
})
.controller('MyCalendarCtrl', function($scope, Events) {
        $scope.events = Events;

        $scope.myCalendar = function(event) {
            return (event.roles.some(function(role) {
                if (!role.attendence.current) return false;

                return (role.attendence.current.some(function(currentId) {
                    if (currentUser.userId === currentId) return true;
                }));
            }));
        }

        $scope.maxTotal = function(event) {
            var maxTotal = 0;
            event.roles.forEach(function(role) {
                maxTotal += role.attendence.max;
            });
            return maxTotal;
        };

        $scope.currentTotal = function(event) {
            var currentTotal = 0;
            event.roles.forEach(function(role) {
                currentTotal += role.attendence.current ? role.attendence.current.length : 0;
            });
            return currentTotal;
        };



    })
.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.factory('Events', function($firebaseArray) {
  var itemsRef = new Firebase("https://good-deed.firebaseio.com/events");
  var Events = $firebaseArray(itemsRef.orderByChild('date'));
  return Events;
})
.factory('Users', function($firebaseArray) {
  var itemsRef = new Firebase("https://good-deed.firebaseio.com/users");
  var Users = $firebaseArray(itemsRef);
  return Users;
})
.factory('Badges', function($firebaseArray) {
  var itemsRef = new Firebase("https://good-deed.firebaseio.com/badges");
  var Badges = $firebaseArray(itemsRef);
  return Badges;
});
