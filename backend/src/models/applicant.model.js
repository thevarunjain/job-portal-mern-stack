'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const name = require('./name.model')

const applicantSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: [name.nameSchema],
    required: true
  },
  address: {
    type: String,
    maxlength: 50,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: Number,
    maxlength: 50,
    required: true
  },
  zipcode: {
    type: Number,
    maxlength: 50,
    required: true
  },
  experience: {
    type: String,
    maxlength: 50,
    required: true
  },
  education: {
    type: Number,
    maxlength: 50,
    required: true
  },
  skills: {
    type: Number,
    maxlength: 50,
    required: true
  },
  summary: {
    type: Number,
    maxlength: 50,
    required: true
  },
  resume: {
    type: String,
    maxlength: 50,
    required: true
  },
  profile_image: {
    type: Number,
    maxlength: 50,
    required: true
  },
  banner_image: {
    type: String,
    maxlength: 50,
    required: true
  }
}, {
  timestamps: true
})

applicantSchema.method({
  transform () {
    const transformed = {}
    const fields = ['userId']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

module.exports = mongoose.model('Applicant', applicantSchema)
