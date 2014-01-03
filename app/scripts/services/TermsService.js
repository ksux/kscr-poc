'use strict';

angular.module('kscrPocApp')
  .factory('TermsService', function() {
    var data = [
      {
        label: 'Fall 2012',
        id: '201203'
      },
      {
        label: 'Spring 2013',
        id: '201301'
      }
    ];
    return {
      data: data,
      findById: function(id) {
        for( var i = 0, l = data.length; i < l; i++ ) {
          if( data[i].id === id ) {
            return data[i];
          }
        }
        return null;
      }
    };
  });
