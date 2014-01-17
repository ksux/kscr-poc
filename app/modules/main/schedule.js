'use strict';

angular.module('kscrPocApp')
  .controller('MainScheduleCtrl', function ($scope, ScheduleService) {
    $scope.schedule = ScheduleService;
  });
