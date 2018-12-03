'use strict'

const redis = require('redis')
const config = require('../config')
const redisClient = redis.createClient(config.redisPort)

redisClient.on('connect', function() {
  console.log('Redis client connected');
});

redisClient.on("error", function (err) {
  console.log(`Error in Redis client initialization ${err}`);
  process.exit(-1)
});

module.exports = redisClient

