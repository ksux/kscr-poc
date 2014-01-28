'use strict';

angular.module('kscrPocApp')
  .controller('AppScheduleCtrl', function ($scope, scheduleService, config) {
    $scope.schedule = scheduleService.query({ userId: config.userId, termCode: $scope.searchCriteria.termCode });
  });
