'use strict';

angular.module('kscrPocApp')
  .factory('regGroupService', function ($http, config, $q, orderByFilter) {

    // Indicate if all items in one array is found in another.
    function arrayHasValues(arr, items) {
      // Allows objects to be used, instead of just arrays.
      items = angular.isArray(items) ? items : [items];
      for( var i = 0, l = items.length; i < l; i++ ) {
        if( arr.indexOf(items[i]) === -1 ) {
          return false;
        }
      }
      return true;
    }

    // Group AOs by type
    /*
    {
      activityOfferingTypes: [ // Sorted by priority
        {
          name: '',
          description: '',
          activityOfferings: [ // Sorted by meeting daytime
            {
              isSelected: true,
              isSelectable: true, // false if this AO isn't in the selectable Reg Group list
              ...
            }
          ]
        }
      ],
      selectedActivityOfferingIds: []
      selectableRegGroupIds: [] // When length === 1, that's the only choice.
    }
    */

    // Get all the Reg Groups for a certain Course Offering.
    function getRegGroups(params, defaultAOIds, selectedAOIds) {
      // Configure the parameters.
      var httpConfig = {
        params: params
      };

      defaultAOIds = angular.isArray(defaultAOIds) ? defaultAOIds : [ defaultAOIds ];
      selectedAOIds = angular.isArray(selectedAOIds) ? selectedAOIds : [ selectedAOIds ];

      // Call all services.
      // We must use $http, because $resource doesn't return promises.
      var regGroupsResource = $http.get(config.apiBase + 'reggroups', httpConfig);
      var activityOfferingsResource = $http.get(config.apiBase + 'activityofferings', httpConfig);
      var activityTypesResource = $http.get(config.apiBase + 'activitytypes', httpConfig);
      // Group resources.
      var resources = [regGroupsResource, activityOfferingsResource, activityTypesResource];
      
      // Wait for the promises to be resolved.
      return $q.all(resources).then(function(results) {
        // Pull out the results.
        var regGroupsData = results[0].data;
        var activityOfferingsData = results[1].data;
        var activityTypesData = results[2].data;

        //
        // Index
        //

        //var regGroupIndexById = {};
        var associatedAOIdsIndex = {};
        var selectedAOIdsIndex = {};
        var selectableAOIdsIndex = {};

        // Loop through all Reg Group objects.
        angular.forEach(regGroupsData, function(regGroup) {
          // Keep a Reg Group if it contains all the Activity Offering Ids indicated.
          if( arrayHasValues(regGroup.activityOfferingIds, defaultAOIds) ) {
            //regGroupIndexById[regGroup.regGroupId] = regGroup;

            var regGroupHasSelectedAOs = arrayHasValues(regGroup.activityOfferingIds, selectedAOIds);

            // Store all the Activity Offering Ids associated with these Reg Groups.
            angular.forEach(regGroup.activityOfferingIds, function(aoId) {

              // Index all Activity Offerings in these Reg Groups.
              associatedAOIdsIndex[aoId] = true;

              // Index all selected Activity Offerings.
              if( arrayHasValues(selectedAOIds, aoId) ) {
                selectedAOIdsIndex[aoId] = true;
              }

              // Only Activity Offerings in Reg Groups that contain
              // the selected Activity Offerings are selectable.
              if( regGroupHasSelectedAOs ) {
                selectableAOIdsIndex[aoId] = true;
              }
            });
          }
        });

        //
        // Filter
        //

        // Keep only relevant Activity Offerings.
        var _activityOfferingsData = [];
        angular.forEach(activityOfferingsData, function(ao) {
          // Retain Activity Offerings if they are associated
          // with the appropriate Reg Groups,
          // and they aren't explicitly meant to be ignored.
          var aoId = ao.activityOfferingId;
          if( associatedAOIdsIndex[aoId] && !arrayHasValues(defaultAOIds, aoId) ) {
            _activityOfferingsData.push(ao);
          }
        });
        // Overwrite the source array.
        activityOfferingsData = _activityOfferingsData;

        //
        // Sort
        //

        // Sort Activity Types by priority.
        activityTypesData = orderByFilter(activityTypesData, 'priority');

        // Prepare sort predicates for Activity Offerings.
        var aoSortPredicates = 'sun,mon,tue,wed,thu,fri,sat,startTime'.split(',');
        // Prefix all predicates, since the schedule data is a nested object.
        angular.forEach(aoSortPredicates, function(predicate, key) {
          aoSortPredicates[key] = 'schedule.' + predicate;
        });
        // Sort Activity Offerings by day, then time.
        activityOfferingsData = orderByFilter(activityOfferingsData, aoSortPredicates, true);

        //
        // Index
        //

        // Keep indexes of Activity Offerings for quick reference.
        var aoIndexById = {};
        var aoIndexByType = {};

        // Process indexes.
        angular.forEach(activityOfferingsData, function(ao) {

          // Indicates that this Activity Offering is selected.
          ao.isSelected = selectedAOIdsIndex[ao.activityOfferingId] === true;

          // Indicates that this Activity Offering can be selected,
          // since it is associated with a possible Reg Group.
          ao.isSelectable = selectableAOIdsIndex[ao.activityOfferingId] === true;

          // Index Activity Offerings by id.
          aoIndexById[ ao.activityOfferingId ] = ao;
          
          // Initiate an array of a certain Type, if it doesn't yet exist.
          if( angular.isUndefined(aoIndexByType[ ao.activityOfferingTypeName ]) ) {
            aoIndexByType[ ao.activityOfferingTypeName ] = [];
          }
          // Add the Activity Offerings to its respective Type array.
          aoIndexByType[ ao.activityOfferingTypeName ].push(ao);
        });

        //
        // Prepare return data
        //

        // Prepare the return data.
        var data = {
          activityOfferingTypes: []
        };

        // Group all sorted Activity Offerings by sorted Activity Offering Types.
        angular.forEach(activityTypesData, function(activityType) {
          var typeName = activityType.name;
          var activityOfferings = aoIndexByType[typeName];

          // Ignore any Activity Offering Types
          // in which there were no AOs found.
          if( !angular.isArray(activityOfferings) ) {
            return;
          }

          // Add the Type.
          data.activityOfferingTypes.push({
            name: typeName,
            description: activityType.description,
            activityOfferings: activityOfferings
          });
        });

        return data;
      });
    }

    //function checkSelectability(data, selectedAOIds) {
    //}

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
          if( arrayHasValues(regGroup.activityOfferingIds, aoIds) ) {
            data.push(regGroup);
          }
        });
        return data;
      });
    }

    return {
      // @param params Object
      // @param aoIds String/Array (optional)
      get: function(params, defaultAOIds, selectedAOIds) {
        //console.log('woot', aoIds);
        return getRegGroups(params, defaultAOIds, selectedAOIds);
        /*
        if( angular.isArray(aoIds) || angular.isString(aoIds) ) {
          return getRegGroupsByAOIds(params, aoIds);
        }
        return getRegGroups(params);
        */
      }
    };
  });
