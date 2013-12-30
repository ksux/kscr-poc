'use strict';

angular.module('kscrPocApp')
  .value('ScheduleService', [
    {
      termName: 'Fall 2012',
      registrationGroups: [
        {
          courseCode: 'CHEM105',
          courseTitle: 'Introduction to Chemistry',
          creditType: 'fixed',
          fixedCredits: 4,
          activityOfferings: [
            {
              type: 'Lecture',
              isMon: true,
              isWed: true,
              isFri: true,
              startTime: '13:00',
              endTime: '15:00',
              buildingCode: 'CHM',
              roomCode: '1105'
            }
          ]
        }
      ]
    }
  ]);
