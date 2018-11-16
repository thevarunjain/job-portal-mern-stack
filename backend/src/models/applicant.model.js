'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const name = require('./name.model')
const experience = require('./experience.model')
const education = require('./education.model')

const applicantSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  name: {
    type: name.schema,
    required: true
  },
  address: {
    type: String,
    maxlength: 100
  },
  city: {
    type: String,
    maxlength: 100
  },
  state: {
    type: Number,
    maxlength: 100
  },
  zipcode: {
    type: Number,
    maxlength: 100
  },
  experience: {
    type: experience.schema,
    maxlength: 100
  },
  education: {
    type: education.schema,
    maxlength: 100
  },
  skills: {
    type: String,
    maxlength: 100
  },
  summary: {
    type: String,
    maxlength: 5000
  },
  resume: {
    type: String,
    maxlength: 100
  },
  profile_image: {
    type: String,
    maxlength: 100
  },
  banner_image: {
    type: String,
    maxlength: 100
  }
}, {
  timestamps: true
})

applicantSchema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'name', 'address', 'city', 'state', 'zipcode', 'experience', 'education', 'skills', 'summary', 'resume', 'profile_image', 'banner_image']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

module.exports = mongoose.model('Applicant', applicantSchema)
