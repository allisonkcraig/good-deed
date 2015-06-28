// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.events', {
      url: "/events",
      views: {
        'menuContent': {
          templateUrl: "templates/event-list.html",
          controller: 'EventsCtrl'
        }
      }
    })

  .state('app.event', {
    url: "/events/:eventId",
    views: {
      'menuContent': {
        templateUrl: "templates/event.html",
        controller: 'EventCtrl'
      }
    }
  })

    .state('app.mycalendar', {
    url: "/mycalendar",
    views: {
      'menuContent': {
        templateUrl: "templates/my-calendar.html",
        controller: 'MyCalendarCtrl'
      }
    }
  })
    .state('app.splashpage', {
    url: "/splashpage",
    views: {
      'menuContent': {
        templateUrl: "templates/splashpage.html",
        controller: 'AppCtrl'
      }
    }
  })
    .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html",
        controller: 'SettingsCtrl'
      }
    }
  })
    .state('app.friendslist', {
    url: "/friendslist",
    views: {
      'menuContent': {
        templateUrl: "templates/friends-list.html",
        controller: 'FriendsListCtrl'
      }
    }
  })
    .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html",
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/splashpage');
});
