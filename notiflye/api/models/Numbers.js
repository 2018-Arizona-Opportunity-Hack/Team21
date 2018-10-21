/**
 * Numbers.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    "name": {
      type: 'String',
      required: true
    },
    'phoneNumber' : {
      type: 'String',
      required: true
    },
    'email' : {
      type: 'String',
      required: true
    },
    'owner' : {
      type: 'String',
      required: true
    },
    'group' : {
      type: 'json',
       columnType: 'array',
      required: false
    },
    'csvid': {
      type: 'String',
      required: true
    }
  }

};
