'use strict';

angular.module('kscrPocApp')
  .factory('CourseOfferingService', function ($resource) {
    //return $resource('http://env2.ks.kuali.org/services/ScheduleOfClassesService/courseofferings/termcode/:termCode/course/:courseCode');
    return $resource('http://128.8.108.102:8081/ks-with-rice-bundled-dev/services/ScheduleOfClassesService/activityofferings/termcode/:termCode/course/:courseCode');
  });
