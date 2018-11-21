'use strict'

const httpStatus = require('http-status')
const sql = require('./../services/sql')
const mongoose = require('mongoose')
const APIError = require('../utils/APIError')
const Job = require('../models/job.model')
// const Applicant = require('../models/applicant.model')
const Application = require('../models/application.model')

exports.apply = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId)) throw new APIError(`Invalid jobId`, httpStatus.BAD_REQUEST)
    const response = { payLoad: {} }
    const applicationData = req.body
    applicationData.jobId = req.params.jobId
    const jobData = await Job.findById(req.params.jobId).exec()
    if (!jobData) throw new APIError(`Invalid jobId`, httpStatus.INTERNAL_SERVER_ERROR)
    applicationData.recruiterId = jobData.recruiter
    applicationData.applicantId = req.user._id
    const application = new Application(applicationData)
    const savedApplication = await application.save()
    if (!savedApplication) throw new APIError(`Job not created`, httpStatus.INTERNAL_SERVER_ERROR)
    const applicationPointers = {
      'job_id': savedApplication.jobId,
      'applicant_id': savedApplication.applicantId,
      'recruiter_id': savedApplication.recruiterId,
      'application_id': savedApplication._id
    }
    await sql.query('INSERT INTO job_application SET ?', applicationPointers)
    response.payLoad = savedApplication
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

exports.save = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId)) throw new APIError(`Invalid jobId`, httpStatus.BAD_REQUEST)
    const response = {payLoad: {}, message: ''}
    const saveJobPointers = {
      'job_id': req.params.jobId,
      'applicant_id': req.user._id
    }
    const currentValues = await sql.query(`SELECT * FROM saved_job WHERE job_id = '${saveJobPointers.job_id}' AND applicant_id = '${saveJobPointers.applicant_id}'`)
    if (currentValues.length > 0) throw new APIError(`Job already saved`, httpStatus.INTERNAL_SERVER_ERROR)
    const queryOutput = await sql.query('INSERT INTO saved_job SET ?', saveJobPointers)
    if (!queryOutput) throw new APIError(`Job not saved`, httpStatus.INTERNAL_SERVER_ERROR)
    response.message = 'SUCCESS'
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
