'use strict';

angular.module('kscrPocApp')
  .factory('CourseOfferingService', function ($resource, config) {
    return $resource(config.apiBase + 'courseofferings');
  });
