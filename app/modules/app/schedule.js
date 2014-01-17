'use strict';

angular.module('kscrPocApp')
  .controller('AppScheduleCtrl', function ($scope, ScheduleService) {
    $scope.schedule = ScheduleService;
  });
