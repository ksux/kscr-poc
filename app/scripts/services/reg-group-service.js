'use strict';

angular.module('kscrPocApp')
  .factory('regGroupService', function ($http, config, $q) {

    // Indicate if all items in one array is found in another.
    function arrayContainsAll(arr, items) {
      for( var i = 0, l = items.length; i < l; i++ ) {
        if( arr.indexOf(items[i]) === -1 ) {
          return false;
        }
      }
      return true;
    }

    return {
      // Get all the Reg Groups for a certain Course Offering.
      get: function(params) {
        var httpConfig = {
          params: params
        };
        // Call both services.
        // We must use $http, because $resource doesn't return promises.
        var regGroupsResource = $http.get(config.apiBase + 'reggroups', httpConfig);
        var activityOfferingsResource = $http.get(config.apiBase + 'activityofferings', httpConfig);
        // Wait for the promises to be resolved.
        return $q.all([regGroupsResource, activityOfferingsResource]).then(function(results) {
          // Pull out the results.
          var regGroupsData = results[0].data;
          var activityOfferingsData = results[1].data;
          // Keep an index of Activity Offerings for quick reference.
          var indexedActivityOfferings = {};
          angular.forEach(activityOfferingsData, function(ao) {
            indexedActivityOfferings[ ao.activityOfferingId ] = ao;
          });
          // For each Reg Group, create references to its respective Activity Offerings.
          angular.forEach(regGroupsData, function(regGroup) {
            regGroup.activityOfferings = [];
            angular.forEach(regGroup.activityOfferingIds, function(aoId) {
              regGroup.activityOfferings.push( indexedActivityOfferings[aoId] );
            });
          });

          return regGroupsData;
        });
      },
      // Get all the Reg Groups for a Course Offering
      // that contain all the indicated Activity Offerings.
      getByAOIds: function(params, aoIds) {
        // Make the aoIds an array, if it isn't already.
        aoIds = angular.isArray(aoIds) ? aoIds : [ aoIds ];
        // Filter the output of `get`.
        return this.get(params).then(function(result) {
          var data = [];
          // Loop through all Reg Group objects.
          angular.forEach(result, function(regGroup) {
            // Keep a Reg Group if it contains all the Activity Offering Ids indicated.
            if( arrayContainsAll(regGroup.activityOfferingIds, aoIds) ) {
              data.push(regGroup);
            }
          });
          return data;
        });
      }
    };
  });
