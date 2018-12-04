'use strict'

const httpStatus = require('http-status')
const sql = require('./../services/sql')
const mongoose = require('mongoose')
const APIError = require('../utils/APIError')
const Job = require('../models/job.model')

exports.click = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId)) throw new APIError(`Invalid jobId`, httpStatus.BAD_REQUEST)
    const response = {payLoad: {}, message: ''}
    const recruiterId = await recruiterByJobId(req.params.jobId)
    const saveJobClickPointers = {
      'jobId': req.params.jobId,
      'userId': req.user._id,
      'recruiterId': recruiterId,
      'time': new Date()
    }
    await sql.query('INSERT INTO job_click SET ?', saveJobClickPointers)
    response.message = 'SUCCESS'
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

exports.startApplication = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId)) throw new APIError(`Invalid jobId`, httpStatus.BAD_REQUEST)
    const response = {payLoad: {}, message: ''}
    const saveIncompleteJobPointers = {
      'jobId': req.params.jobId,
      'userId': req.user._id,
      'time': new Date()
    }
    await sql.query('INSERT INTO incomplete_application SET ?', saveIncompleteJobPointers)
    response.message = 'SUCCESS'
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

exports.profileView = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    const response = {payLoad: {}, message: ''}
    const saveProfileViewPointers = {
      'viewedUserId': req.params.userId,
      'userId': req.user._id,
      'time': new Date()
    }
    await sql.query('INSERT INTO profile_view SET ?', saveProfileViewPointers)
    response.message = 'SUCCESS'
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

const recruiterByJobId = async (jobId) => {
  const job = await Job.findById(jobId).exec()
  return job.recruiter
}
