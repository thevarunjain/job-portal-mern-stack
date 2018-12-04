'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const name = require('./name.model')
const address = require('./address.model')

const recruiterSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: name.schema,
    required: true
  },
  address: {
    type: address.schema
  },
  phone_number: {
    type: String
  },
  headline: {
    type: String
  },
  company: {
    type: String
  },
  profile_image: {
    type: String,
    default: 'default-profile-image.jpg'
  },
  banner_image: {
    type: String
  }
}, {
  timestamps: true
})

recruiterSchema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'name', 'address', 'phone_number', 'company', 'profile_image', 'banner_image']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  },
  identityTransform () {
    const transformed = {}
    const fields = ['id', 'name', 'profile_image']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

module.exports = mongoose.model('Recruiter', recruiterSchema)
