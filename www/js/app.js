// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives'])

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
  
  .state('app.main', {
    url: "/main",
    views: {
      'menuContent': {
        templateUrl: "templates/main.html",
        controller: 'AppCtrl'
      }
    }
  })
  
  .state('app.transfer', {
       
    url: "/transfer",
    views: {
      'menuContent': {
        templateUrl: "templates/transfer.html",
        controller: 'AppCtrl'
      }
    }
  })
  
  .state('app.news', {
    url: "/news",
    views: {
      'menuContent': {
        templateUrl: "templates/news.html",
        controller: 'AppCtrl'
      }
    }
  })
  
  .state('app.agency', {
    url: "/agency",
    views: {
      'menuContent': {
        templateUrl: "templates/agency.html",
        controller: 'AppCtrl'
      }
    }
  })
  
   .state('app.membership', {
    url: "/membership",
    views: {
      'menuContent': {
        templateUrl: "templates/membership.html",
        controller: 'AppCtrl'
      }
    }
  })
  
   .state('app.coaching', {
    url: "/coaching",
    views: {
      'menuContent': {
        templateUrl: "templates/coaching.html",
        controller: 'AppCtrl'
      }
    }
  })
  
   .state('app.career', {
    url: "/career",
    views: {
      'menuContent': {
        templateUrl: "templates/career.html",
        controller: 'AppCtrl'
      }
    }
  })
  
   .state('app.antidoping', {
    url: "/antidoping",
    views: {
      'menuContent': {
        templateUrl: "templates/antidoping.html",
        controller: 'AppCtrl'
      }
    }
  })
  
  .state('app.tax', {
    url: "/tax",
    views: {
      'menuContent': {
        templateUrl: "templates/tax.html",
        controller: 'AppCtrl'
      }
    }
  })
  
  .state('app.window', {
    url: "/window",
    views: {
      'menuContent': {
        templateUrl: "templates/window.html",
        controller: 'AppCtrl'
      }
    }
  })
  
  .state('app.betting', {
    url: "/betting",
    views: {
      'menuContent': {
        templateUrl: "templates/betting.html",
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.team', {
    url: "/team",
    views: {
      'menuContent': {
        templateUrl: "templates/team.html",
        controller: 'TeamCtrl'
      }
    }
  })
  
  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/map.html",
        controller: 'MapCtrl'
      }
    }
  })
  /*.state('app.platforms', {
      url: "/platforms",
      views: {
        'menuContent': {
          templateUrl: "templates/platforms.html",
          controller: 'PlatformCtrl'
        }
      }
    })*/
   /* .state('app.news', {
      url: "/news",
      views: {
        'menuContent': {
          templateUrl: "templates/news.html",
          controller: 'NewsCtrl'
        }
      }
  })*/

  /*.state('app.single', {
    url: "/news/:story",
    views: {
      'menuContent': {
        templateUrl: "templates/story.html",
        controller: 'NewsCtrl'
      }
    }
  })*/;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/main');
});
