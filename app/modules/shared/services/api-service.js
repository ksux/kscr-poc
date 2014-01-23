'use strict';

angular.module('kscrPocApp')
  .factory('apiService', function (config) {
    return {
      get: function(endpoint) {
        var url = config.apiBase;
        switch(endpoint) {
          case 'personschedule':
            url += config.apiCourseRegistrationBase;
            break;
          default:
            url += config.apiScheduleOfClassesBase;
            break;
        }
        url += endpoint;
        return url;
      }
    };
  });
