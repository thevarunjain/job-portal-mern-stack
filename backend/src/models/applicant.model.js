'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const name = require('./name.model')
const experience = require('./experience.model')
const education = require('./education.model')

const applicantSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: name.schema,
    required: true
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: Number
  },
  zipcode: {
    type: Number
  },
  experience: {
    type: experience.schema
  },
  education: {
    type: education.schema
  },
  skills: {
    type: String
  },
  summary: {
    type: String
  },
  resume: {
    type: String
  },
  profile_image: {
    type: String
  },
  banner_image: {
    type: String
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
