'use strict';

angular.module('kscrPocApp')
  .factory('SearchResultsService', function() {
    var results = [
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
      },
      {
        'index': 2,

        // CourseOffering info
        'id': '59c680a6-b97c-4fc9-87c2-b2e48b8c8c84',
        'courseOfferingCode': 'GIGW121',
        'title': 'Urban Skateboarding',
        'creditType': 'fixed',
        'fixedCredits': 3,
        'isHonors': false,

        // Top-prioritized ActivityOffering info
        'scheduleItems': [
          {
            'isTue': true,
            'isThu': true,
            'startTime': '09:00',
            'endTime': '12:00'
          }
        ],
        'type': 'Lecture',
        'instructorNames': [ // Sorted by percentage of effort
          {
            'firstName': 'Marty',
            'lastName': 'McFly'
          }
        ],
        'enrollmentCount': 7,
        'maxEnrollmentCount': 20
      },
      {
        'index': 3,

        // CourseOffering info
        'id': '59c680a6-b97c-4fc9-87c2-b2e48b8c8c85',
        'courseOfferingCode': 'TRDS923',
        'title': 'Theories of Wibbly Wobbly',
        'creditType': 'multiple',
        'multipleCredits': [1, 5],
        'isHonors': true,

        // Top-prioritized ActivityOffering info
        'scheduleItems': [
          {
            'isSat': true,
            'startTime': '14:30',
            'endTime': '18:00'
          }
        ],
        'type': 'Lecture',
        'instructorNames': [ // Sorted by percentage of effort
          {
            'firstName': 'Doctor',
            'lastName': 'Who'
          }
        ],
        'enrollmentCount': 0,
        'maxEnrollmentCount': 3
      }
    ];

    // Index all results according to their provided index.
    var indexedItems = [];
    angular.forEach(results, function(value) {
      indexedItems[ value.index ] = value;
    });

    // Get the item from the indexed cache.
    var getItem = function(index, indexModifier) {
      // Transform into numbers, since the index is probably a string,
      // pulled from the URL.
      index = angular.isString(index) ? parseInt(index) : index;
      // By default, don't alter the index, but add the modifier if provided.
      index += angular.isDefined(indexModifier) ? indexModifier : 0;
      // Find and return the item.
      return indexedItems[index] || null;
    };

    return {
      results: results,
      count: results.length,
      item: function(index) {
        return getItem(index, 0);
      },
      next: function(index) {
        return getItem(index, 1);
      },
      previous: function(index) {
        return getItem(index, -1);
      }
    };
  });
