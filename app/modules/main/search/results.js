'use strict';

angular.module('kscrPocApp')
  .controller('MainSearchResultsCtrl', function ($scope, primaryActivityOfferingService) {
    $scope.results = primaryActivityOfferingService.query({
        termCode: '201208',
        courseCode: $scope.searchCriteria.query
      });
  });
