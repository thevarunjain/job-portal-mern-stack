'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const coordinates = require('./coordinates.model')

const addressSchema = new Schema({
  street: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  zipcode: {
    type: Number
  },
  coordinates: {
    type: coordinates.schema
  }
})

module.exports = mongoose.model('Address', addressSchema)
