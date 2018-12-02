'use strict'

const Joi = require('joi')

// User validation rules
module.exports = {
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required()
    }
  },
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      role: Joi.string().valid(['recruiter', 'applicant']).required()
    }
  },
  update: {
    body: {
      name: Joi.object().keys({
        first: Joi.string().max(128),
        last: Joi.string().max(128)
      }),
      headline: Joi.string(),
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
      experience: Joi.array().items(Joi.object().keys({
        title: Joi.string().max(128),
        company: Joi.string().max(128),
        location: Joi.string().max(128),
        headline: Joi.string().max(128),
        description: Joi.string(),
        date: Joi.object().keys({
          startdate: Joi.date(),
          enddate: Joi.date()
        })
      })),
      education: Joi.array().items(Joi.object().keys({
        school: Joi.string().max(128),
        degree: Joi.string().max(128),
        field: Joi.string().max(128),
        grade: Joi.string().max(128),
        description: Joi.string(),
        date: Joi.object().keys({
          startdate: Joi.date(),
          enddate: Joi.date()
        })
      })),
      skills: Joi.array().items(Joi.string()),
      summary: Joi.string(),
      resume: Joi.string(),
      profile_image: Joi.string(),
      banner_image: Joi.string()
    }
  }
}
