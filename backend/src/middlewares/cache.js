'use strict'

const RedisClient = require('../services/redis')
const httpStatus = require('http-status')

const cache = (req, res, next) => {
  console.log('In Redis cache')
  const response = {payLoad: []}
  const page = req.body.page ? req.body.page : 1
  const criterion = req.body.criterion ? req.body.criterion : ' '
  let lat = null
  let long = null
  if (req.body.coordinates) {
    lat = req.body.coordinates.latitude ? req.body.coordinates.latitude : null
    long = req.body.coordinates.longitude ? req.body.coordinates.longitude : null
  }
  var key = criterion.split(' ').join('_') + '_' + lat + '_' + long
  console.log('Key to check ' + key)
  RedisClient.get(key, function (err, val) {
    if (err) throw err
    if (val != null) {
      // response.payLoad = JSON.parse(val)
      response.payLoad = paginate(JSON.parse(val), page)
      res.status(httpStatus.OK)
      res.send(response)
    } else {
      next()
    }
  })
}

const paginate = (array, pageNumber) => {
  --pageNumber
  return array.slice(pageNumber * 10, (pageNumber + 1) * 10)
}

module.exports = cache
