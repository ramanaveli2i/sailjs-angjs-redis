/**
 * Currencies.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var Waterline = require('waterline');

//Define your collection (aka model)
var Currencies = Waterline.Collection.extend({

  attributes: {
    iso_id: {
      type: 'string',
      required: true,
      maxLength: 3
    },
    active: {
      type: 'boolean',
      default: true
    },
    balance: {
      type: 'float',
      default: 0
    },
    exdiff: {
      type: 'float',
      default: 0
    },
    exdiffdate: {
      type: 'date',
      defaultsTo: new Date(2000, 1, 1)
    },
    localbalance: {
      type: 'float',
      default: 0
    },
    name: {
      type: 'string',
      required: true
    },
    organisation: {
      type: 'integer',
      required: true
    },
    ratefrom: {
      type: 'float',
      default: 0
    },
    rateto: {
      type: 'float',
      default: 0
    },
  }
});

module.exports = Currencies;
