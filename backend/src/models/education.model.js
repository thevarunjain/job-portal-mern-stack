'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

export const educationSchema = new Schema({
  school: {
    type: String,
    required: true,
    index: true
  },
  degree: {
    type: String,
    required: true,
    index: true
  },
  field: {
    type: String,
    required: true,
    index: true
  },
  grade: {
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

module.exports = mongoose.model('Education', educationSchema)
