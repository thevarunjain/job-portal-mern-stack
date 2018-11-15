'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

export const experienceSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  company: {
    type: String,
    required: true,
    index: true
  },
  location: {
    type: String,
    required: true,
    index: true
  },
  headline: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    index: true
  },
  start_date: {
    type: Number,
    maxlength: 50,
    required: true,
    index: true
  },
  end_date: {
    type: Number,
    maxlength: 50,
    required: true,
    index: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Experience', experienceSchema)
