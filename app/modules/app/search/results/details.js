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
    $scope.hasPreviousItem = $scope.previousItem !== null;
    $scope.hasNextItem = $scope.nextItem !== null;

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
    $scope.selectedAOsByActivityType = {};

    // Gather first round of secondary Activity Offering data.
    getSecondaryActivityOfferings();

    // A secondary Activity Offering was selected.
    $scope.updateSelections = function() {
      // Transform selected Activity Offering Ids
      // from their Activity Type keys into an array.
      var selectedAOIds = [];
      angular.forEach($scope.selectedAOsByActivityType, function(ao) {
        selectedAOIds.push(ao.activityOfferingId);
      });

      // Build a model for displaying a summary of the selections.
      var selectionSummary = [];
      angular.forEach($scope.regGroups.activityOfferingTypes, function(aoType) {
        var ao = $scope.selectedAOsByActivityType[aoType.name];
        selectionSummary.push({
          typeName: aoType.name,
          ao: ao,
          hasSelected: angular.isDefined(ao)
        });
      })
      $scope.selectionSummary = selectionSummary;

      // Recheck selections against the raw data.
      //getSecondaryActivityOfferings(selectedAOIds);
    };

    function getSecondaryActivityOfferings(selectedAOIds) {
      regGroupService.get(params, aoId, selectedAOIds).then(function(result) {
        $scope.regGroups = result;
        $scope.updateSelections();
        console.log('selected reg group', result.selectedRegGroupId);
      });
    }

    //
    // Registration
    //

    $scope.register = function() {
    };

  });
