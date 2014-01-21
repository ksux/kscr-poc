'use strict';

angular.module('kscrPocApp')
  .controller('AppSearchResultsCtrl', function ($scope, primaryActivityOfferingService) {
    $scope.results = primaryActivityOfferingService.query({
        termId: $scope.searchCriteria.termId,
        courseCode: $scope.searchCriteria.query
      });
  });
