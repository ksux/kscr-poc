'use strict';

angular.module('kscrPocApp')
  .controller('AppSearchQueryCtrl', function ($scope, $state) {
    $scope.search = function() {
      $state.go('app.search.results.list');
    };
  });
