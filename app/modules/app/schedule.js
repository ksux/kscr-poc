'use strict';

angular.module('kscrPocApp')
  .controller('AppScheduleCtrl', function ($scope, scheduleService, config) {
    $scope.schedules = scheduleService.query({ userId: config.userId });
  });
