'use strict';

angular.module('kscrPocApp')
  .controller('MainSearchResultsDetailsCtrl', function ($scope, $state, $stateParams, pagingService, regGroupService) {
    var paging = pagingService.get('primaryActivityOffering');
    $scope.item = paging.item($stateParams.index);

    // If the item hasn't been found, then redirect.
    if( $scope.item === null ) {
      $state.go('main.search.results.list');
      return;
    }

    $scope.previousItem = paging.previous($stateParams.index);
    $scope.nextItem = paging.next($stateParams.index);

    var params = {
      termCode: '201208',
      courseCode: $scope.item.courseOfferingCode
    };

    var aoId = $scope.item.activityOfferingId;

    $scope.regGroups = [];

    regGroupService.get(params, aoId).then(function(result) {
      console.log('working', result);
      $scope.regGroups = result;
    });

    $scope.activityOfferings = [
      { id: '1a', time: 'TuTh 9-9:50am' },
      { id: '2b', time: 'MoWeFri 11am-1:15pm' }
    ];
  });
