'use strict'

const Joi = require('joi')

// Job validation rules
module.exports = {
  create: {
    body: {
      title: Joi.string().max(128).required(),
      company: Joi.string().max(128).required(),
      description: Joi.string().required(),
      industry: Joi.string().max(128).required(),
      type: Joi.string().max(128).required(),
      address: Joi.object().keys({
        street: Joi.string().max(128).required(),
        city: Joi.string().max(128).required(),
        country: Joi.string().max(128).required(),
        zipcode: Joi.number().required(),
        coordinates: Joi.object().keys({
          latitude: Joi.number().min(-90).max(90).required(),
          longitude: Joi.number().min(-180).max(180).required()
        })
      }).required(),
      skills: Joi.array().items(Joi.string().required()),
      function: Joi.string().max(128).required(),
      company_logo: Joi.string().default('default-company.png'),
      easy_apply: Joi.boolean().default(false)
    }
  },
  update: {
    body: {
      title: Joi.string().max(128),
      company: Joi.string().max(128),
      description: Joi.string(),
      industry: Joi.string().max(128),
      type: Joi.string().max(128),
      address: Joi.object().keys({
        street: Joi.string().max(128),
        city: Joi.string().max(128),
        country: Joi.string().max(128),
        zipcode: Joi.number(),
        coordinates: Joi.object().keys({
          latitude: Joi.number().min(-90).max(90),
          longitude: Joi.number().min(-180).max(180)
        })
      }),
      skills: Joi.array().items(Joi.string()),
      function: Joi.string().max(128),
      company_logo: Joi.string(),
      easy_apply: Joi.boolean()
    }
  },
  apply: {
    body: {
      name: Joi.object().keys({
        first: Joi.string().max(128).required(),
        last: Joi.string().max(128).required()
      }).required(),
      phone: Joi.number().min(1000000000).required(),
      email: Joi.string().email().required(),
      address: Joi.object().keys({
        street: Joi.string().max(128),
        city: Joi.string().max(128),
        country: Joi.string().max(128),
        zipcode: Joi.number(),
        coordinates: Joi.object().keys({
          latitude: Joi.number().min(-90).max(90),
          longitude: Joi.number().min(-180).max(180)
        })
      }),
      resume: Joi.string().required(),
      cover_letter: Joi.string(),
      source: Joi.string().required(),
      diversity: Joi.string().required(),
      sponsorship: Joi.string().required(),
      disability: Joi.string().required()
    }
  },
  easyApply: {
    body: {
      phone: Joi.number().min(1000000000).required(),
      email: Joi.string().email().required(),
      resume: Joi.string().required()
    }
  }
}
