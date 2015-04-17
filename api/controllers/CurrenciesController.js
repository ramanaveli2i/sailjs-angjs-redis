/**
 * CurrenciesController
 *
 * @description :: Server-side logic for managing currencies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var redis = require('redis');
var Scripto = require('redis-scripto');
var common = require('../../scripts/common.js');
var redisConfig = require('../../config/connections.js').connections.someRedisdbServer;

//set-up a redis client
redisClient = redis.createClient(redisConfig.port, redisConfig.host);

var scriptManager = new Scripto(redisClient);

module.exports = {
  /**
   * CurrenciesController.getAll()
   */
  getAll: function(req, res, next) {
    Currencies.find()
      .exec(function(err, currencies) {
        if (err) return next(err);
        return res.json(currencies);
      });

  },

  /**
   * CurrenciesController.create()
   */
  create: function(req, res, next) {
    common.registerCommonScripts();
    var client = {};
    client.name = "john smith1";
    client.email = "johnsmith@test1.com"
    client.mobile = "07777 123456";
    client.address = "test road, london, abc123";
    client.ifaid = "";
    client.clienttype = 1;
    client.insttypes = ["CFD", "DE"]
    client.hedge = 0;
    client.brokerclientcode = "abc123";
    client.commissionpercent = "";
    client.active = 1;
    scriptManager.load(common);
    scriptManager.run('scriptnewclient', [], [2, client.name, client.email, client.mobile,
      client.address, client.ifaid, client.clienttype,
      client.insttypes, client.hedge, client.brokerclientcode,
      client.commissionpercent, client.active
    ], function(err, result) {

      console.log(err || result);
    });
    Currencies.create(req.body)
      .exec(function(err, result) {
        if (err) return next(err);
        //res.redirect('currencies')
        return res.json(result);
      });
  },

  view: function(req, res, next) {
    var id = req.param("id", null);
    Currencies.findOne(id).done(function(err, result) {
      if (err) return next(err);
      /*res.render('currencies/view', {
        'model': model
      });*/
      return res.json(result);
    });
  },

  update: function(req, res, next) {
    var id = req.param("id", null);
    currencies.findOne(id).done(function(err, model) {
      if (err) return next(err);
      if (req.method == "POST" && req.param("currencies", null) != null) {
        var p = req.param("currencies", null);
        model.name = p.name;
        model.age = p.age;
        model.save(function(err) {
          if (err) {
            res.send("Error");
          } else {
            res.redirect('currencies/view/' + model.id);
          }
        });
      } else {
        res.render('currencies/update', {
          'model': model
        });
      }
    });
  },

  delete: function(req, res, next) {
    var id = req.param("id", null);
    currencies.findOne(id).done(function(err, user) {
      if (err) return next(err);
      user.destroy(function(err) {
        res.redirect('currencies/index/');
        // record has been removed
      });
    });
  },

};