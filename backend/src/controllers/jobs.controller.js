'use strict'

const httpStatus = require('http-status')
const mongoose = require('mongoose')
const APIError = require('../utils/APIError')
const Job = require('../models/job.model')

exports.get = async (req, res, next) => {
  try {
    // console.log('\n\n\n', req.user.role, '\n\n\n')
    const response = { payLoad: {} }
    const jobs = await Job.find().exec()
    response.payLoad = jobs
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

exports.post = async (req, res, next) => {
  try {
    // console.log('\n\n\n', req.user.role, '\n\n\n')
    const response = { payLoad: {} }
    const job = new Job(req.body)
    const createdJob = await job.save()
    if (!createdJob) throw new APIError(`Job not created`, httpStatus.INTERNAL_SERVER_ERROR)
    response.payLoad = createdJob
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

exports.getOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId)) throw new APIError(`Invalid jobId`, httpStatus.BAD_REQUEST)
    const response = { payLoad: {} }
    const job = await Job.findById(req.params.jobId).exec()
    response.payLoad = job
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

exports.putOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId)) throw new APIError(`Invalid jobId`, httpStatus.BAD_REQUEST)
    const response = { payLoad: {}, message: '' }
    const jobId = req.params.jobId
    const job = await Job.findById(jobId).exec()
    if (!job) throw new APIError(`No job associated with id: ${jobId}`, httpStatus.NOT_FOUND)
    for (const key in req.body) {
      if (job.schema.obj.hasOwnProperty(key) && key !== 'id' && key !== '_id' && key !== 'recruiter') {
        job[key] = req.body[key]
      }
    }
    const updatedJob = await job.save()
    if (updatedJob) {
      response.message = 'SUCCESS'
      response.payLoad = updatedJob
    } else {
      throw new APIError(`Job with id: ${jobId} not updated`, httpStatus.NOT_FOUND)
    }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

exports.deleteOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.jobId)) throw new APIError(`Invalid jobId`, httpStatus.BAD_REQUEST)
    const response = { payLoad: {}, message: '' }
    const deleteJob = await Job.findByIdAndDelete(req.params.jobId).exec()
    if (deleteJob) {
      response.message = 'SUCCESS'
      res.status(httpStatus.OK)
      res.send(response)
    } else {
      throw new APIError(`Job with id: ${req.params.jobId} not deleted`, httpStatus.NOT_FOUND)
    }
  } catch (error) {
    next(error)
  }
}
