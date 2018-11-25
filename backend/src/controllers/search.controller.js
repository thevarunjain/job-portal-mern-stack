/* eslint-disable camelcase */
'use strict'

const httpStatus = require('http-status')
// const mongoose = require('mongoose')
const APIError = require('../utils/APIError')
const Recruiter = require('../models/recruiter.model')
const Applicant = require('../models/applicant.model')
const Job = require('../models/job.model')
// const Thread = require('../models/conversation.model')
// const sql = require('./../services/sql')

// router.get('/', auth(), searchController.getAll)
exports.getAll = async (req, res, next) => {
  try {
    const response = { payLoad: {} }
    const job = await Job.find().exec()
    const recruiter = await Recruiter.find().exec()
    const applicant = await Applicant.find().exec()
    response.payLoad = { job, recruiter, applicant }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
// router.get('/jobs', auth(), searchController.getJobs)
exports.getJobs = async (req, res, next) => {
  try {
    const response = { payLoad: {} }
    const job = await Job.find().exec()
    response.payLoad = { job }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

// router.get('/users', auth(), searchController.getUsers)
exports.getUsers = async (req, res, next) => {
  try {
    const response = { payLoad: {} }
    const recruiter = await Recruiter.find().exec()
    const applicant = await Applicant.find().exec()
    response.payLoad = { recruiter, applicant }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

// router.post('/jobs', auth(), searchController.getFilteredJobs)
exports.getFilteredJobs = async (req, res, next) => {
  try {
    const response = { payLoad: [] }
    const title = req.body.title ? req.body.title : null
    const company = req.body.company ? req.body.company : null
    const skills = req.body.skills ? req.body.skills : []
    let lat = null
    let long = null
    if (req.body.coordinates) {
      lat = req.body.coordinates.latitude ? req.body.coordinates.latitude : null
      long = req.body.coordinates.longitude ? req.body.coordinates.longitude : null
    }
    const job = await Job.find().exec()
    for (let index = 0; index < job.length; index++) {
      const element = job[index]
      let passesCriteria = true
      if (lat && long && passesCriteria) {
        passesCriteria = distance(lat, long, element.address.coordinates.latitude, element.address.coordinates.longitude) < 50
      }
      if (title && element.title && passesCriteria) {
        passesCriteria = element.title.toLowerCase().includes(title.toLowerCase())
      }
      if (company && element.company && passesCriteria) {
        passesCriteria = element.company.toLowerCase().includes(company.toLowerCase())
      }
      if (skills.length > 0 && element.skills && passesCriteria) {
        passesCriteria = false
        skills.forEach(skill => {
          if (element.skills.includes(skill)) passesCriteria = true
        })
      }
      if (passesCriteria) {
        response.payLoad.push(element)
      }
    }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

// router.post('/users', auth(), searchController.getFilteredUsers)
exports.getFilteredUsers = async (req, res, next) => {
  try {
    if (!req.body.name) throw new APIError(`Invalid input`, httpStatus.BAD_REQUEST)
    const response = { payLoad: [] }
    const recruiter = await Recruiter.find().exec()
    const applicant = await Applicant.find().exec()
    const name = req.body.name.toLowerCase()
    for (let index = 0; index < recruiter.length; index++) {
      const element = recruiter[index]
      const fullName = element.name.first + ' ' + element.name.last
      if (fullName.toLowerCase().includes(name)) {
        response.payLoad.push(element)
      }
    }
    for (let index = 0; index < applicant.length; index++) {
      const element = applicant[index]
      const fullName = element.name.first + ' ' + element.name.last
      if (fullName.toLowerCase().includes(name)) {
        response.payLoad.push(element)
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
