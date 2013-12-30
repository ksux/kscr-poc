'use strict';

angular.module('kscrPocApp')
  .value('SearchResultsService', [
    {
      'index': 1,

      // CourseOffering info
      'id': '59c680a6-b97c-4fc9-87c2-b2e48b8c8c83',
      'courseOfferingCode': 'ENGL233',
      'title': 'Introduction to Asian American Literature',
      'creditType': 'range',
      'fixedCredits': 1,
      'maxCredits': 3,
      'minCredits': 1,
      'multipleCredits': [ 1.5, 3, 5 ],
      'isHonors': false,

      // Top-prioritized ActivityOffering info
      'scheduleItems': [
        {
          'isSun': false,
          'isMon': true,
          'isTue': false,
          'isWed': true,
          'isThu': false,
          'isFri': false,
          'isSat': false,
          'startTime': '13:00',
          'endTime': '15:00'
        },
        {
          'isSun': false,
          'isMon': false,
          'isTue': false,
          'isWed': false,
          'isThu': false,
          'isFri': true,
          'isSat': false,
          'startTime': '11:30',
          'endTime': '12:45'
        }
      ],
      'type': 'Lecture',
      'instructorNames': [ // Sorted by percentage of effort
        {
          'firstName': 'Emmett',
          'lastName': 'Brown'
        },
        {
          'firstName': 'Sara',
          'lastName': 'Connors'
        }
      ],
      'enrollmentCount': 20,
      'maxEnrollmentCount': 30
    }
  ]);
