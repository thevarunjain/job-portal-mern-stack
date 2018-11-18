'use strict'

const httpStatus = require('http-status')
// const mongoose = require('mongoose')
const APIError = require('../utils/APIError')
// const Job = require('../models/job.model')
// const Applicant = require('../models/applicant.model')
const Application = require('../models/application.model')

exports.apply = async (req, res, next) => {
  try {
    // console.log('\n\n\n', req.user.role, '\n\n\n')
    const response = { payLoad: {} }
    const applicaiton = new Application(req.body)
    const savedApplication = await applicaiton.save()
    if (!savedApplication) throw new APIError(`Job not created`, httpStatus.INTERNAL_SERVER_ERROR)
    response.payLoad = savedApplication
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

exports.save = async (req, res, next) => {
  try {
    // console.log('\n\n\n', req.user.role, '\n\n\n')
    const response = { payLoad: {} }
    // const job = new Job(req.body)
    // const createdJob = await job.save()
    // if (!createdJob) throw new APIError(`Job not created`, httpStatus.INTERNAL_SERVER_ERROR)
    // response.payLoad = createdJob
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
