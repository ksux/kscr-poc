'use strict';

angular.module('kscrPocApp')
  .controller('AppScheduleCtrl', function ($scope, scheduleService) {
    $scope.schedule = scheduleService.query({ person: 'admin', termCode: '201208' });
  });
