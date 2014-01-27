'use strict';

angular.module('kscrPocApp')
  .controller('AppSearchResultsCtrl', function ($scope, $state, $stateParams, primaryActivityOfferingService) {

    // Override any defaults with those provided in the url.
    // This allows deep linking.
    $scope.searchCriteria.query = $stateParams.query;
    $scope.searchCriteria.termCode = $stateParams.termCode;

    // Build the params for the search.
    var params = {
      termCode: $stateParams.termCode,
      courseCode: $stateParams.query
    };

    // Search.
    primaryActivityOfferingService.query(params, function(results) {
      // Process the results.
      $scope.results = results;
      var hasResults = results.itemCount > 0;
      // Redirect appropriately.
      $state.go( 'app.search.results.' + (hasResults ? 'list' : 'empty'), $stateParams );
    });

  });
