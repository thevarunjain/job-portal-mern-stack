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
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
