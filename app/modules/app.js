'use strict';

angular.module('kscrPocApp')
  .controller('AppCtrl', function ($scope, termsService) {
    // Default values
    $scope.searchCriteria = {
      termId: 'kuali.atp.2012Spring',
      query: 'CHEM237'
    };
    // Toggle the visibility of the global search interface.
    $scope.showSearch = false;
    // Store the term object.
    $scope.selectedTerm = null;

    // Acquire all active terms.
    termsService.query({ active: true }, function(results) {
      $scope.terms = results;
      updateSelectedTerm($scope.searchCriteria.termId);
    });

    // Because we want to select terms using a string model, instead
    // of an object, we need to watch for changes and store the full
    // object model for display.
    $scope.$watch('searchCriteria.termId', function(newValue) {
      updateSelectedTerm(newValue);
    });

    function updateSelectedTerm(termId) {
      // Ignore if the term data has yet to be returned.
      if( !angular.isArray($scope.terms) ) {
        return;
      }
      // Store the appropriate term object.
      for( var i = 0, l = $scope.terms.length; i < l; i++ ) {
        var term = $scope.terms[i];
        if( term.termId === termId ) {
          $scope.selectedTerm = term;
          return;
        }
      }
    }
  });
