'use strict';

angular.module('ksCrPocApp')
  .filter('days', function () {
    return function (input, formatType) {
      // Default format type
      formatType = typeof formatType !== 'undefined' ? formatType : 'short';
      // Default formats
      var formats = {
        'short': {
          labels: 'Su,M,Tu,W,Th,F,Sa'.split(','),
          delimiter: ''
        },
        'medium': {
          labels: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
          delimiter: ', '
        },
        'long': {
          labels: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
          delimiter: ', '
        }
      };
      // The intended format
      var format = formats[formatType];
      // These properties are expected from the service
      var apiFormat = 'isSun,isMon,isTue,isWed,isThu,isFri,isSat'.split(',');
      // List of all the day labels
      var output = [];
      // Loop through the days
      for( var i = 0, l = apiFormat.length; i < l; i++ ) {
        // Add the appropriate day label as the boolean indicates
        if( input[ apiFormat[i] ] ) {
          output.push( format.labels[i] );
        }
      }
      // Combine the day labels with the appropriate delimiter
      return output.join( format.delimiter );
    };
  });
