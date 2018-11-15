'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

export const nameSchema = new Schema({
  first: {
    type: String,
    required: true,
    index: true
  },
  last: {
    type: String,
    required: true,
    index: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Name', nameSchema)
