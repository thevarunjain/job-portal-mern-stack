/* eslint-disable camelcase */
'use strict'

const httpStatus = require('http-status')
// const mongoose = require('mongoose')
// const APIError = require('../utils/APIError')
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
    const response = { payLoad: {} }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

// router.post('/users', auth(), searchController.getFilteredUsers)
exports.getFilteredUsers = async (req, res, next) => {
  try {
    const response = { payLoad: [] }
    const recruiter = await Recruiter.find().exec()
    const applicant = await Applicant.find().exec()
    const name = req.body.name.toLowerCase()
    for (let index = 0; index < recruiter.length; index++) {
      const element = recruiter[index];
      const fullName  = element.name.first + ' ' + element.name.last
      if(fullName.toLowerCase().includes(name)){
        response.payLoad.push(element)
      }
    }
    for (let index = 0; index < applicant.length; index++) {
      const element = applicant[index];
      const fullName  = element.name.first + ' ' + element.name.last
      if(fullName.toLowerCase().includes(name)){
        response.payLoad.push(element)
      }
    }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
