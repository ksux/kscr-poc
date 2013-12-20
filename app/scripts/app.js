'use strict';

angular.module('ksCrPocApp', [
  //'ngCookies',
  //'ngResource',
  //'ngSanitize',
  //'ngRoute',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    
    // For any unmatched url, send to a default route
    $urlRouterProvider.otherwise('/schedule');
    
    // States
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'partials/app.html',
        controller: function($scope) {
          var terms = [
            {
              label: 'Fall 2012',
              id: '201203'
            },
            {
              label: 'Spring 2013',
              id: '201301'
            }
          ];
          $scope.selectedSearchTerm = '201301';
          $scope.searchTerms = terms;
          $scope.showSearch = true;
        }
      })
      .state('app.schedule', {
        url: '/schedule',
        templateUrl: 'partials/app.schedule.html',
      })
      .state('app.results', {
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('app.results.list', {
        url: '/list',
        templateUrl: 'partials/app.results.list.html',
        controller: 'MainCtrl'
      })
      .state('app.results.details', {
        url: '/details',
        templateUrl: 'partials/app.results.details.html',
        controller: 'MainCtrl'
      });
  });
