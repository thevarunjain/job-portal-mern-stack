'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const educationSchema = new Schema({
  school: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  grade: {
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
})

module.exports = mongoose.model('Education', educationSchema)
