'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const experienceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  start_date: {
    type: Number,
    maxlength: 50,
    required: true
  },
  end_date: {
    type: Number,
    maxlength: 50,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Experience', experienceSchema)
