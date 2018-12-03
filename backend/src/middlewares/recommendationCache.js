'use strict'

const RedisClient = require('../services/redis')
const httpStatus = require('http-status')

const recommendationCache = (req, res, next) => {
  const response = {payLoad: []}
  const key = req.user._id
  RedisClient.get(key, function (err, val) {
    if (err) throw err
    if (val != null) {
      response.payLoad = JSON.parse(val)
      res.status(httpStatus.OK)
      res.send(response)
    } else {
      next()
    }
  })
}

module.exports = recommendationCache
