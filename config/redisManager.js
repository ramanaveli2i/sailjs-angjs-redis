var redis = require('redis');
var redisConfig = require('./connections.js').connections.someRedisdbServer;
//set-up a redis client
redisClient = redis.createClient(redisConfig.port, redisConfig.host);
var common = require('../scripts/common.js');
var Scripto = require('redis-scripto');

module.exports.init = function (cb){
    common.registerCommonScripts();
    var scriptManager = new Scripto(redisClient);
    scriptManager.load(common);
    return scriptManager;
};
