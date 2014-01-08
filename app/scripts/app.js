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
      .state('app', {
        abstract: true,
        templateUrl: 'partials/app.html',
        controller: function($scope, TermsService, SearchResultsService) {
          // Default values
          $scope.searchCriteria = {
            termId: '201301',
            term: null,
            query: 'travel'
          };
          $scope.terms = TermsService.data;
          $scope.showSearch = false;

          // Because we want to select terms using a string model, instead
          // of an object, we need to watch for changes and store the full
          // object model for display.
          $scope.$watch('searchCriteria.termId', function(newValue) {
            $scope.searchCriteria.term = TermsService.findById(newValue);
          });

          $scope.itemCount = SearchResultsService.count;
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
            $state.go('app.search.results.list');
          };
        }
      })
      .state('app.search.results', {
        abstract: true,
        url: '/results',
        templateUrl: 'partials/app.search.results.html',
        controller: function($scope, SearchResultsService, CourseOfferingService) {
          $scope.results = SearchResultsService.results;
          $scope.co = CourseOfferingService.query({ termCode: '201201', courseCode: 'CHEM2' }, function() {
            console.log($scope.co);
          });
        }
      })
      .state('app.search.results.list', {
        url: '',
        templateUrl: 'partials/app.search.results.list.html',
        data: {
          title: '3 results'
        }
      })
      .state('app.search.results.details', {
        url: '/:index/:code',
        templateUrl: 'partials/app.search.results.details.html',
        controller: function($scope, $stateParams, SearchResultsService) {
          $scope.previousItem = SearchResultsService.previous($stateParams.index);
          $scope.nextItem = SearchResultsService.next($stateParams.index);
          $scope.item = SearchResultsService.item($stateParams.index);
        }
      })
      .state('app.search.results.details.activity', {
        url: '/activity',
        templateUrl: 'partials/app.search.results.details.activities.html',
        controller: function($scope) {
          $scope.activityOfferings = [
            { time: 'TuTh 9-9:50am' },
            { time: 'MoWeFri 11am-1:15pm' }
          ];
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
