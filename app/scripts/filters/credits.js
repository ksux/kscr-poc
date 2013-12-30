'use strict';

angular.module('kscrPocApp')
  .filter('credits', function ($sce) {
    var singular = 'credit';
    var plural = singular + 's';

    return function (courseOffering) {
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
