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

    var params = {
      //termId: $scope.searchCriteria.termId,
      termCode: $scope.searchCriteria.termCode,
      courseCode: $scope.item.courseOfferingCode
    };

    var aoId = $scope.item.activityOfferingId;
    var selectedAOIds = [];

    function getSecondaryActivityOfferings(selectedAOIds) {
      regGroupService.get(params, aoId, selectedAOIds).then(function(result) {
        $scope.hasSecondaryActivityOfferings = result.activityOfferingTypes.length > 0;
        $scope.regGroups = result;
      });
    }

    getSecondaryActivityOfferings(selectedAOIds);

    $scope.selectAO = function(ao) {
      // Refuse selection.
      if( !ao.isSelectable ) {
        console.log('nope');
        return;
      }
      // Undo selection.
      if( ao.isSelected ) {
        var position = selectedAOIds.indexOf(ao.activityOfferingId);
        selectedAOIds.splice(position, 1);
      }
      // Or refine selection.
      else {
        selectedAOIds.push(ao.activityOfferingId);
      }
      // Update selections.
      getSecondaryActivityOfferings(selectedAOIds);
    };

  });
