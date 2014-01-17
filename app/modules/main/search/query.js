'use strict';

angular.module('kscrPocApp')
  .controller('MainSearchQueryCtrl', function ($scope, $state) {
    $scope.search = function() {
      $state.go('main.search.results.list');
    };
  });
