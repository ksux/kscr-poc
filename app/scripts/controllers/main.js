'use strict';

angular.module('ksCrPocApp')
  .controller('MainCtrl', function ($scope, coSearchResults) {
    $scope.results = coSearchResults;
  });
