'use strict'

const httpStatus = require('http-status')
const Recruiter = require('../models/recruiter.model')
const Applicant = require('../models/applicant.model')

exports.getAll = async (req, res, next) => {
  try {
    // console.log('\n\n\n', req.user.role, '\n\n\n')
    const response = {payLoad: {}}
    const recruiter = await Recruiter.find().exec()
    const applicant = await Applicant.find().exec()
    response.payLoad = { applicant, recruiter }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

exports.getOne = async (req, res, next) => {
  try {
    const response = {payLoad: {}}
    let user = await Applicant.findOne({id: req.params.userId}).exec()
    if (!user) {
      user = await Recruiter.findOne({id: req.params.userId}).exec()
      response.payLoad.role = 'recruiter'
    } else {
      response.payLoad.role = 'applicant'
    }
    response.payLoad.user = user
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
