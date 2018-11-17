'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dateSchema = new Schema({
  startdate: {
    type: Date,
    required: true
  },
  enddate: {
    type: Date
  }
})

module.exports = mongoose.model('Date', dateSchema)
