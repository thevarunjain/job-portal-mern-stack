'use strict'

const Joi = require('joi')

// Common validation rules
module.exports = {
  userId: {
    params: {
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  },
  jobId: {
    params: {
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  }
}
