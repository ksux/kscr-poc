'use strict';

angular.module('kscrPocApp')
  .factory('termsService', function ($resource, config) {
    return $resource(config.apiBase + 'terms', {}, {
      query: {
        method: 'GET',
        cache: true,
        isArray: true
      }
    });
  });