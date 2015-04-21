/**
 * ClientController
 * @description :: Server-side logic for managing Client
 */
 
// node modules
// external modules
var redis = require('redis');
var Scripto = require('redis-scripto');
 
// cw2t libraries
var common = require('../../scripts/common.js');
 
// Database configuration
var redisConfig = require('../../config/connections.js').connections.someRedisdbServer;
 
//set-up a redis client
redisClient = redis.createClient(redisConfig.port, redisConfig.host);
 
// Script manager to load scripts to run
var scriptManager = new Scripto(redisClient);
common.registerCommonScripts();
scriptManager.load(common);
 
module.exports = {
  /**
   * ClientController.create()
   */
  create: function(req, res, next) {
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
 
    scriptManager.run('scriptnewclient', [], [2, client.name, client.email, client.mobile,
      client.address, client.ifaid, client.clienttype,
      client.insttypes, client.hedge, client.brokerclientcode,
      client.commissionpercent, client.active
    ], function(err, result) {
      console.log(err || result);
    });
    return res.json(result);
  },
};