'use strict';

angular.module('kscrPocApp')
  .controller('MainSearchResultsDetailsActivitiesCtrl', function ($scope) {
    $scope.activityOfferings = [
      { id: '1a', time: 'TuTh 9-9:50am' },
      { id: '2b', time: 'MoWeFri 11am-1:15pm' }
    ];
    $scope.selectedActivityOffering = null;
    $scope.$watch('selectedActivityOffering', function(newValue) {
      console.log('selected', newValue);
    });
  });
