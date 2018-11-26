'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coordinatesSchema = new Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Coordinates', coordinatesSchema)
