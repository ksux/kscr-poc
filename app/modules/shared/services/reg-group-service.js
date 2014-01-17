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

    // Get all the Reg Groups for a certain Course Offering.
    function getRegGroups(params) {
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
        // Keep indexes of Activity Offerings for quick reference.
        var aoIndexById = {};
        var aoIndexByType = {};
        // Process indexes.
        angular.forEach(activityOfferingsData, function(ao) {
          // Index Activity Offerings by id.
          aoIndexById[ ao.activityOfferingId ] = ao;
          // Index Activity Offerings by type name.
          if( angular.isUndefined(aoIndexByType[ ao.activityOfferingTypeName ]) ) {
            aoIndexByType[ ao.activityOfferingTypeName ] = [];
          }
          aoIndexByType[ ao.activityOfferingTypeName ].push(ao);
        });
        // Create appropriate references for each Reg Group.
        angular.forEach(regGroupsData, function(regGroup) {
          // Create references to Activity Offerings.
          regGroup.activityOfferings = [];
          angular.forEach(regGroup.activityOfferingIds, function(aoId) {
            regGroup.activityOfferings.push( aoIndexById[aoId] );
          });
          // Create references to Activity Offering types.
          regGroup.activityOfferingTypes = [];
          angular.forEach(aoIndexByType, function(aos, aoTypeName) {
            regGroup.activityOfferingTypes.push({
              typeName: aoTypeName,
              activityOfferings: aos
            });
          });
        });

        return regGroupsData;
      });
    }

    // Get all the Reg Groups for a Course Offering
    // that contain all the indicated Activity Offerings.
    function getRegGroupsByAOIds(params, aoIds) {
      // Make the aoIds an array, if it isn't already.
      aoIds = angular.isArray(aoIds) ? aoIds : [ aoIds ];
      // Filter the output of `get`.
      return getRegGroups(params).then(function(result) {
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

    // Transform Reg Groups into something more suitable for this UI.
    // - Extract AO Types.
    // - Pull out primary AO references.
    // - Link AOs to Reg Groups.
    function transformRegGroups(regGroups, excludedAOIds) {

    }

    return {
      // @param params Object
      // @param aoIds String/Array (optional)
      get: function(params, aoIds) {
        if( angular.isArray(aoIds) || angular.isString(aoIds) ) {
          return getRegGroupsByAOIds(params, aoIds);
        }
        return getRegGroups(params);
      }
    };
  });
