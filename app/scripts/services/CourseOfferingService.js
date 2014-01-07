'use strict';

angular.module('kscrPocApp')
  .factory('CourseOfferingService', function ($resource) {
    return $resource('http://env2.ks.kuali.org/services/ScheduleOfClassesService/courseofferings/termcode/:termCode/course/:courseCode');
  });
