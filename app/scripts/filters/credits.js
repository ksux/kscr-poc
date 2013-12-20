'use strict';

angular.module('ksCrPocApp')
  .filter('credits', function ($sce) {
    return function (courseOffering) {
      var singular = 'credit';
      var plural = singular + 's';
      switch( courseOffering.creditType ) {
        case 'range':
          return $sce.trustAsHtml(courseOffering.minCredits + '&ndash;' + courseOffering.maxCredits + ' ' + plural);
        case 'multiple':
          return courseOffering.multipleCredits.join(', ') + ' ' + plural;
        default: // 'fixed'
          return courseOffering.fixedCredits + ' ' + (courseOffering.fixedCredits === 1 ? singular : plural);
      }
    };
  });
