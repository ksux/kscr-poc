'use strict';

angular.module('kscrPocApp')
  .controller('AppSearchResultsCtrl', function ($scope, primaryActivityOfferingService, regGroupService) {
    $scope.results = primaryActivityOfferingService.query({
        termCode: '201208',
        courseCode: $scope.searchCriteria.query
      });
    
    var params = {
      termCode: '201201',
      courseCode: 'CHEM237'
    };

    regGroupService.get(params).then(function(result) {
      console.log('all', result);
      //$scope.stuffs = result;
    });

    var ids = ['6b1354c2-953d-4099-a773-83a562566bac'];
    
    regGroupService.getByAOIds(params, ids).then(function(result) {
      console.log('limited', result);
      //$scope.stuffs = result;
    });
  });
