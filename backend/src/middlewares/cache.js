'use strict'

const RedisClient = require('../services/redis')
const httpStatus = require('http-status')

const cache = (req, res, next) => {

  console.log("In Redis cache");
  const response = {payLoad: []}
  const criterion = req.body.criterion ? req.body.criterion : null
  let lat = null
  let long = null
  if (req.body.coordinates) {
    lat = req.body.coordinates.latitude ? req.body.coordinates.latitude : null
    long = req.body.coordinates.longitude ? req.body.coordinates.longitude : null
  }
  var key = criterion.split(" ").join("_") + "_" + lat + "_" + long
  console.log('Key to check ' + key)
  RedisClient.get(key, function (err, val) {
    if (err) throw err;
    if (val != null) {
      res.status(httpStatus.OK)
      res.send(JSON.parse(response.payLoad.concat(val)))
    } else {
      next();
    }
  });

}
module.exports = cache
