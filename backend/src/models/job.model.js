'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const address = require('./address.model')
// const recruiter = require('./recruiter.model')

const jobSchema = new Schema({
  recruiter: {
    type: Schema.Types.ObjectId,
    ref: 'Recruiter',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  address: {
    type: address.schema,
    required: true
  },
  function: {
    type: String,
    required: true
  },
  company_logo: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  easy_apply: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

jobSchema.method({
  transform () {
    const transformed = {}
    const fields = ['title', 'description', 'industry', 'type', 'location', 'function', 'company_logo', 'skills',
      'easy_apply']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

// module.exports = {
//   'Job': mongoose.model('Job', jobSchema),
//   'jobSchema': jobSchema
// }
module.exports = mongoose.model('Job', jobSchema)
