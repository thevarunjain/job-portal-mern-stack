'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const name = require('./name.model')

const recruiterSchema = new Schema({
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
  phone_number: {
    type: Number,
    maxlength: 100
  },
  company: {
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

recruiterSchema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'name', 'address', 'city', 'state', 'zipcode', 'phone_number', 'company', 'profile_image', 'banner_image']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

module.exports = mongoose.model('Recruiter', recruiterSchema)
