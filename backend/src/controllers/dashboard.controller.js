'use strict'

const httpStatus = require('http-status')
// const sql = require('./../services/sql')
// const mongoose = require('mongoose')
// const APIError = require('../utils/APIError')
// const Job = require('../models/job.model')
// const Application = require('../models/application.model')
// router.get('/dashboard', auth(), usersController.dashboard)

exports.generateDashboardData = async (req, res, next) => {
  try {
    const response = {payLoad: {}, message: ''}
    if (req.user.role === 'applicant') {
      // applicant dashboard
      response.payLoad = {
        profileViewGraph: {},
        appliedCount: 0,
        savedCount: 0,
        viewCount: 0
      }
    } else {
      // recruiter dashboard
      response.payLoad = {
        hotJobGraph: {},
        coldJobGraph: {},
        cityHotJobGraph: {},
        clickOnJobGraph: {},
        savedCount: {},
        totalCount: 0,
        incompleteCount: 0,
        glimpseCount: 0
      }
    }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
