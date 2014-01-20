'use strict';

angular.module('kscrPocApp')
  .controller('AppCtrl', function ($scope, termsService) {
    // Default values
    $scope.searchCriteria = {
      termId: 'kuali.atp.2012Spring',
      termCode: '201201',
      term: null,
      query: 'CHEM237'
    };
    $scope.terms = termsService.query();
    $scope.showSearch = false;

    // Because we want to select terms using a string model, instead
    // of an object, we need to watch for changes and store the full
    // object model for display.
    $scope.$watch('searchCriteria.termId', function() {
      //$scope.searchCriteria.term = termsService.findById(newValue);
    });
  });
