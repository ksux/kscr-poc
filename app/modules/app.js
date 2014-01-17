'use strict';

angular.module('kscrPocApp', [
  'ngAnimate',
  //'ngCookies',
  'ngResource',
  'ngSanitize',
  //'ngRoute',
  'ngTouch',
  'ui.router'
])
  .config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
    
    // Enable cross-domain resource sharing (CORS)
    // http://thibaultdenizet.com/tutorial/cors-with-angular-js-and-sinatra/
    $httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // States
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'modules/main.html',
        controller: 'MainCtrl'
      })
      .state('main.search', {
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('main.search.query', {
        url: '/search',
        templateUrl: 'modules/main/search/query.html',
        data: {
          title: 'Search'
        },
        controller: 'MainSearchQueryCtrl'
      })
      .state('main.search.results', {
        abstract: true,
        url: '/results',
        templateUrl: 'modules/main/search/results.html',
        controller: 'MainSearchResultsCtrl'
      })
      .state('main.search.results.list', {
        url: '',
        templateUrl: 'modules/main/search/results/list.html',
        data: {
          title: '3 results'
        }
      })
      .state('main.search.results.details', {
        url: '/:index/:code',
        templateUrl: 'modules/main/search/results/details.html',
        controller: 'MainSearchResultsDetailsCtrl'
      })
      .state('main.search.results.activity', {
        url: '/activity',
        templateUrl: 'modules/main/search/results/details/activities.html',
        controller: 'MainSearchResultsDetailsActivitiesCtrl'
      })
      .state('main.schedule', {
        url: '/schedule',
        templateUrl: 'modules/main/schedule.html',
        data: {
          title: 'Schedule'
        },
        controller: 'MainScheduleCtrl'
      });

    // For any unmatched url, send to a default route
    $urlRouterProvider.otherwise('/search');
  })
  .run(function ($rootScope, $state) {
    $rootScope.$state = $state;

    var pageTitle = 'Course Registration';
    $rootScope.pageTitle = pageTitle;

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      var titles = [pageTitle];
      if(angular.isDefined(toState.data) && angular.isDefined(toState.data.title)) {
        titles.unshift(toState.data.title);
      }
      $rootScope.pageTitle = titles.join(' - ');
    });

    // Until the `ui-sref` directive allows dynamic state references,
    // we need to manually store and trigger dynamic states.
    // https://github.com/angular-ui/ui-router/issues/395

    // TODO
    // Perhaps a full history could be stored for each state,
    // instead of only one-level back.

    // List of all dynamic state references.
    $rootScope.srefs = {};

    // Register a dynamic state reference.
    var registerSref = function(baseStateName, toState, toParams) {
      $rootScope.srefs[baseStateName] = $state.href(toState, toParams);
    };

    // Registering the default dynamic states.
    registerSref('main.search', 'main.search.query');

    // Whenver the state changes, override the dynamic href
    // generated for any of the decendants of the base state.
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
      angular.forEach($rootScope.srefs, function(value, key) {
        if( $state.includes(key) ) {
          registerSref(key, toState, toParams);
        }
      });
    });

  });
