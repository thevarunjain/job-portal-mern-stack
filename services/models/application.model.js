'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const name = require('./name.model')
const address = require('./address.model')

const applicationSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recruiterId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: name.schema,
    required: true
  },
  email: {
    type: 'String',
    required: true
  },
  phone: {
    type: 'String',
    required: true
  },
  address: {
    type: address.schema,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  cover_letter: {
    type: String
  },
  source: {
    type: String,
    required: true
  },
  diversity: {
    type: String,
    required: true
  },
  sponsorship: {
    type: String,
    required: true
  },
  disability: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

applicationSchema.method({
  transform () {
    const transformed = {}
    const fields = ['name', 'address', 'resume', 'cover_letter', 'source', 'diversity', 'sponsorship', 'disability']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

// module.exports = {
//   'Application': mongoose.model('Application', applicationSchema),
//   'applicationSchema': applicationSchema
// }
module.exports = mongoose.model('Application', applicationSchema)
