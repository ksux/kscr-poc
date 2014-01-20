'use strict';

angular.module('kscrPocApp')
  .controller('AppSearchResultsCtrl', function ($scope, primaryActivityOfferingService) {
    $scope.results = primaryActivityOfferingService.query({
        //termId: $scope.searchCriteria.termId,
        termCode: $scope.searchCriteria.termCode,
        courseCode: $scope.searchCriteria.query
      });
  });
