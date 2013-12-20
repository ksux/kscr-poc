'use strict';

angular.module('ksCrPocApp')
  .filter('meetingTimes', function ($sce, daysFilter, timeRangeFilter) {
    return function (input) {
      var mts = [];
      for( var i = 0, l = input.length; i < l; i++ ) {
        var mt = input[i];
        mts.push( [ daysFilter(mt), timeRangeFilter(mt) ].join(' ') );
      }
      return $sce.trustAsHtml(mts.join(', '));
    };
  });
