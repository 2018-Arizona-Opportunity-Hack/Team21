/**
 * Groups.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    'ids': {
      type: 'json',
      columnType: 'array',
      required: true
    },
    'name': {
      type: 'String',
      required: true
    },
    'campaign': {
      collection: 'campaign',
      via: 'targetGroups'
    }

  }

};
