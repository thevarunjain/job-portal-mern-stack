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
      jobId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  },
  threadId: {
    params: {
      threadId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  }
}
