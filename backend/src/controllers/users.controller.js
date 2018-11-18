'use strict'

const httpStatus = require('http-status')
// const User = require('../models/user.model')
const Recruiter = require('../models/recruiter.model')
const Applicant = require('../models/applicant.model')

exports.getAll = async (req, res, next) => {
  try {
    const recruiter = await Recruiter.find().exec()
    const applicant = await Applicant.find().exec()
    const response = { applicant, recruiter }
    res.status(httpStatus.ACCEPTED)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
