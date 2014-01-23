'use strict';

angular.module('kscrPocApp')
  .controller('AppSearchResultsCtrl', function ($scope, $state) {
    // Redirect if there has been no call for results.
    if( angular.isUndefined($scope.results) ) {
      $state.go('app.search.query');
    }
  });
