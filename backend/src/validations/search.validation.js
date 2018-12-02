'use strict'

const Joi = require('joi')

// Search validation rules
module.exports = {
  jobs: {
    body: {
      criterion: Joi.string(),
      coordinates: Joi.object().keys({
        latitude: Joi.number().min(-90).max(90),
        longitude: Joi.number().min(-180).max(180)
      })
    }
  },
  users: {
    body: {
      name: Joi.string().required()
    }
  }
}
