'use strict';

angular.module('kscrPocApp')
  .controller('MainCtrl', function ($scope, coSearchResults) {
    $scope.results = coSearchResults;
  });
