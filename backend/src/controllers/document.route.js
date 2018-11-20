'use strict'

const httpStatus = require('http-status')
const APIError = require('../utils/APIError')

exports.upload = async (req, res, next) => {
  try {
    if (!req.files) { throw new APIError('File is not recived') }
    const response = { payLoad: [] }
    for (let index = 0; index < req.files.length; index++) {
      const element = req.files[index]
      response.payLoad.push(element.filename)
    }
    res.status(httpStatus.CREATED)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
