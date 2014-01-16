'use strict';

angular.module('kscrPocApp')
  .controller('AppSearchResultsDetailsCtrl', function ($scope, $state, $stateParams, pagingService, regGroupService) {
    var paging = pagingService.get('primaryActivityOffering');
    $scope.item = paging.item($stateParams.index);

    // If the item hasn't been found, then redirect.
    if( $scope.item === null ) {
      $state.go('app.search.results.list');
      return;
    }

    $scope.previousItem = paging.previous($stateParams.index);
    $scope.nextItem = paging.next($stateParams.index);
    console.log($scope);
    regGroupService.getByAOIds({
      termCode: '201208',
      courseCode: $scope.item.courseOfferingCode
    }, $scope.item.activityOfferingId).then(function(result) {
      console.log('working', result);
      //$scope.stuffs = result;
    });

    regGroupService.get({
      termCode: '201208',
      courseCode: $scope.item.courseOfferingCode
    }).then(function(result) {
      console.log('hurray', result);
      //$scope.stuffs = result;
    });

    $scope.activityOfferings = [
      { id: '1a', time: 'TuTh 9-9:50am' },
      { id: '2b', time: 'MoWeFri 11am-1:15pm' }
    ];
  });
