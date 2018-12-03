'use strict'

const httpStatus = require('http-status')
const mongoose = require('mongoose')
const APIError = require('../utils/APIError')
const Job = require('../models/job.model')
const Applicant = require('../models/applicant.model')

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
    if (req.user.role !== 'recruiter') throw new APIError(`Unauthorized only Recruiter can create a job`, httpStatus.UNAUTHORIZED)
    const response = { payLoad: {} }
    req.body.recruiter = req.user._id
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

exports.recommendation = async (req, res, next) => {
  try {
    const user = await Applicant.findOne({ id: req.user._id }).exec()
    const skills = user.skills ? user.skills : []
    const response = { payLoad: [] }
    const jobs = await Job.find().exec()
    let passesCriteria = false
    for (let index = 0, addCount = 0; index < jobs.length; index++) {
      const element = jobs[index]
      if (skills.length > 0 && element.skills) {
        passesCriteria = false
        skills.forEach(skill => {
          if (element.skills.includes(skill)) passesCriteria = true
        })
      }
      if (passesCriteria && addCount < 12) {
        response.payLoad.push(element)
        jobs.splice(index, 1)
        addCount++
      }
    }
    if (response.payLoad.length < 12) {
      let lat = null
      let long = null
      if (user.address) {
        if (user.address.coordinates) {
          lat = user.address.coordinates.latitude ? user.address.coordinates.latitude : null
          long = user.address.coordinates.longitude ? user.address.coordinates.longitude : null
        }
        for (let index = 0; index < jobs.length; index++) {
          const element = jobs[index]
          passesCriteria = false
          if (lat && long && passesCriteria) {
            passesCriteria = distance(lat, long, element.address.coordinates.latitude, element.address.coordinates.longitude) < 50
          }
          if (passesCriteria) {
            response.payLoad.push(element)
            jobs.splice(index, 1)
          }
        }
      }
    }
    if (response.payLoad.length < 12) {
      for (let index = 0; index < jobs.length && index < 10; index++) {
        const element = jobs[index]
        response.payLoad.push(element)
        jobs.splice(index, 1)
      }
    }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

const distance = (lat1, lon1, lat2, lon2) => {
  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180
  var theta = lon1 - lon2
  var radtheta = Math.PI * theta / 180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  if (dist > 1) {
    dist = 1
  }
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  return dist.toPrecision(2)
}
