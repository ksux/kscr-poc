'use strict';

angular.module('kscrPocApp')
  .value('config', {
    apiBase: 'http://env2.ks.kuali.org/services/',
    apiScheduleOfClassesBase: 'ScheduleOfClassesService/',
    apiCourseRegistrationBase: 'CourseRegistrationClientService/'
  });
