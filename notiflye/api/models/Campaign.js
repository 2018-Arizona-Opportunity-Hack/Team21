/**
 * Campaign.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    'name': {
      type: 'String',
      required: true
    },
    'message': {
      type: 'String',
      required: true
    },
    // 'targetGroups': {
    //   type: 'json',
    //   columnType: 'array',
    //   required: false
    // },
    'targetGroups': {
      collection: 'groups',
      via: 'campaign',

    },
    'responses':{
      type:'json',
      columnType: 'array',
      required: false
    },


  },

};

