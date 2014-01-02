'use strict';

angular.module('kscrPocApp', [
  //'ngCookies',
  //'ngResource',
  'ngSanitize',
  //'ngRoute',
  'ngTouch',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    
    // States
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'partials/app.html',
        controller: function($scope, TermsService) {
          $scope.searchCriteria = {
            selectedTerm: '201301',
            query: ''
          };
          $scope.searchTerms = TermsService;
          $scope.showSearch = false;
        }
      })
      .state('app.search', {
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('app.search.query', {
        url: '/search',
        templateUrl: 'partials/app.search.query.html',
        data: {
          title: 'Search'
        },
        controller: function($scope, $state) {
          $scope.search = function() {
            console.log($scope.searchCriteria);
            $state.go('app.search.results.list');
          };
        }
      })
      .state('app.search.results', {
        abstract: true,
        url: '/results',
        templateUrl: 'partials/app.search.results.html'
      })
      .state('app.search.results.list', {
        url: '',
        templateUrl: 'partials/app.search.results.list.html',
        data: {
          title: 'Results'
        },
        controller: function($scope, SearchResultsService) {
          $scope.results = SearchResultsService.results;
        }
      })
      .state('app.search.results.details', {
        url: '/:index/:code',
        templateUrl: 'partials/app.search.results.details.html',
        controller: function($scope, $stateParams, SearchResultsService) {
          $scope.itemCount = SearchResultsService.count;
          $scope.previousItem = SearchResultsService.previous($stateParams.index);
          $scope.nextItem = SearchResultsService.next($stateParams.index);
          $scope.item = SearchResultsService.item($stateParams.index);
        }
      })
      .state('app.schedule', {
        url: '/schedule',
        templateUrl: 'partials/app.schedule.html',
        data: {
          title: 'Schedule'
        },
        controller: function($scope, ScheduleService) {
          $scope.schedule = ScheduleService;
        }
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
    registerSref('app.search', 'app.search.query');

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
