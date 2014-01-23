'use strict';

angular.module('kscrPocApp')
  .factory('scheduleService', function ($resource, apiService) {
    return $resource(apiService.get('personschedule'), {}, {
      query: {
        method: 'GET',
        cache: true,
        isArray: true
      }
    });
  });
