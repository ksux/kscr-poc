'use strict';

angular.module('kscrPocApp')
  .controller('AppSearchResultsDetailsCtrl', function ($scope, $state, $stateParams, pagingService, regGroupService) {
    
    //
    // Get this Course Offering and primary Activity Offering.
    // 

    var paging = pagingService.get('primaryActivityOffering');
    $scope.item = paging.item($stateParams.index);

    // If the item hasn't been found, then redirect.
    if( $scope.item === null ) {
      $state.go('app.search.results.list');
      return;
    }

    //
    // Grading options.
    //

    $scope.additionalGradingOptions = [];

    if( $scope.item.auditCourse ) {
      $scope.additionalGradingOptions.push('Audit');
    }
    if( $scope.item.studentSelectablePassFail ) {
      $scope.additionalGradingOptions.push('Pass/Fail');
    }

    $scope.hasAdditionalGradingOptions = $scope.additionalGradingOptions.length > 0;

    //
    // Sibling navigation.
    //

    $scope.previousItem = paging.previous($stateParams.index);
    $scope.nextItem = paging.next($stateParams.index);

    //
    // Secondary Activity Offering selection.
    //

    var params = {
      termId: $scope.searchCriteria.termId,
      courseCode: $scope.item.courseOfferingCode
    };
    var aoId = $scope.item.activityOfferingId;

    // Since there's only one AO per Activity Type,
    // match to keys for easy, immediate access.
    $scope.selectedAOIdsByActivityType = {};

    // Gather first round of secondary Activity Offering data.
    getSecondaryActivityOfferings();

    // A secondary Activity Offering was selected.
    $scope.selectedActivityOffering = function() {
      // Transform selected Activity Offering Ids
      // from their Activity Type keys into an array.
      var selectedAOIds = [];
      angular.forEach($scope.selectedAOIdsByActivityType, function(aoId) {
        selectedAOIds.push(aoId);
      });
      // Recheck selections against the raw data.
      getSecondaryActivityOfferings(selectedAOIds);
    };

    function getSecondaryActivityOfferings(selectedAOIds) {
      regGroupService.get(params, aoId, selectedAOIds).then(function(result) {
        $scope.hasSecondaryActivityOfferings = result.activityOfferingTypes.length > 0;
        $scope.regGroups = result;
        console.log('selected reg group', result.selectedRegGroupId);
      });
    }

  });
