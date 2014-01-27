'use strict';

angular.module('kscrPocApp')
  .controller('AppSearchResultsListCtrl', function ($scope, $state, pluralizeFilter, $q) {
    // Update the page title to reflect the number of results.
    $q.when($scope.results).then(function() {
      var state = $state.current;
      var count = $scope.results.itemCount;
      state.data.title = [count, pluralizeFilter(count, 'result')].join(' ');
      $scope.$emit('updateStateTitle', state);
    });
  });
