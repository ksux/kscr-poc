'use strict';

angular.module('kscrPocApp')
  .controller('AppSearchResultsCtrl', function ($scope, primaryActivityOfferingService) {
    $scope.results = primaryActivityOfferingService.query({
        termCode: '201208',
        courseCode: $scope.searchCriteria.query
      });
  });
