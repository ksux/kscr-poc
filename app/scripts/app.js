'use strict';

angular.module('kscrPocApp', [
  //'ngCookies',
  //'ngResource',
  //'ngSanitize',
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
          $scope.selectedSearchTerm = '201301';
          $scope.searchTerms = TermsService;
          $scope.showSearch = true;
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
      })
      .state('app.results', {
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('app.results.list', {
        url: '/results',
        templateUrl: 'partials/app.results.list.html',
        data: {
          title: 'Results'
        },
        controller: function($scope, SearchResultsService) {
          $scope.results = SearchResultsService;
        }
      })
      .state('app.results.details', {
        url: '/details',
        templateUrl: 'partials/app.results.details.html'
      });

    // For any unmatched url, send to a default route
    $urlRouterProvider.otherwise('/schedule');
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
  });
