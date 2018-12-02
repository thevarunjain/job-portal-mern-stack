'use strict'

const Joi = require('joi')

// User validation rules
module.exports = {
  fetch: {
    body: {
      to: Joi.string().required()
    }
  },
  send: {
    body: {
      message: Joi.string().required()
    }
  }
}
