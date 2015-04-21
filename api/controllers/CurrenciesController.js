/**
 * CurrenciesController
 *
 * @description :: Server-side logic for managing currencies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var common = require('../../scripts/common.js');

console.log(sails.config.globals);
var redisManager = sails.config.globals.redisManagerVar;

module.exports = {
  /**
   * CurrenciesController.getAll()
   */
  getAll: function (req, res, next) {
    Currencies.find()
      .exec(function (err, currencies) {
        if (err) return next(err);
        return res.json(currencies);
      });
  }
  , /**
   * CurrenciesController.create()
   */
  create: function (req, res, next) {

    var currency = req.body;
    redisManager.run('scriptnewcurrency', [], [1, currency.iso_id
      , currency.active, currency.balance, currency.exdiff, currency.exdiffdate
      , currency.localbalance, currency.name, currency.ratefrom
      , currency.rateto], function (err, result) {
        if (err) return next(err);
        if (result[0] != 0) {
         console.log("Error in scriptnewcurrency: " + common.getErrorcode(result[0]));
         return res.json('Error : ' + common.getErrorcode(result[0]));
        }
        console.log("currency #" + result[0] + " set-up ok");
        return res.json(result[0]);
    });
  }
  , view: function (req, res, next) {
    var id = req.param("id", null);
    Currencies.findOne(id)
      .done(function (err, result) {
        if (err) return next(err);
        /*res.render('currencies/view', {
          'model': model
        });*/
        return res.json(result);
      });
  }
  , update: function (req, res, next) {

    var currency = req.body;
    redisManager.run('scriptupdatecurrency', [], [req.params.id, 1
      , currency.active, currency.ratefrom, currency.rateto],
      function (err, result) {
        if (err) return next(err);
        if (result[0] != 0) {
         console.log("Error in scriptupdatecurrency: " + common.getErrorcode(result[0]));
         return res.json('Error : ' + common.getErrorcode(result[0]));
        }
        console.log("currency #" + result[0] + " update ok");
        return res.json(result[0]);
      });
  }
  , delete: function (req, res, next) {

    var currency = req.body;
    redisManager.run('scriptdeletecurrency', [], [req.params.id, 1],
      function (err, result) {
        if (err) return next(err);
        if (result[0] != 0) {
          console.log("Error in scriptdeletecurrency: " + common.getErrorcode(result[0]));
          return res.json('Error : ' + common.getErrorcode(result[0]));
        }
        console.log("currency #" + result[0] + " delete ok");
        return res.json(result[0]);
    });
  }
, };
