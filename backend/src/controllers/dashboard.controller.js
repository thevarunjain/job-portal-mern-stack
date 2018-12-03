'use strict'

const httpStatus = require('http-status')
const sql = require('./../services/sql')
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
        profileViewGraph: await profileViewGraph(req.user._id),
        appliedCount: await appliedCount(req.user._id),
        savedCount: await savedCount(req.user._id),
        viewedCount: await viewedCount(req.user._id)
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

const appliedCount = async (applicantId) => {
  const applied = await sql.query(`SELECT COUNT(*) as count FROM job_application WHERE applicant_id = '${applicantId}'`)
  return applied[0].count
}

const savedCount = async (applicantId) => {
  const saved = await sql.query(`SELECT COUNT(*) as count FROM saved_job WHERE applicant_id = '${applicantId}'`)
  return saved[0].count
}

const viewedCount = async (applicantId) => {
  const viewed = await sql.query(`SELECT COUNT(*) as count FROM profile_view WHERE viewedUserId = '${applicantId}'`)
  return viewed[0].count
}

const profileViewGraph = async (applicantId) => {
  applicantId = '5bef6f6c5c3a422c394f8a34'
  const viewsVsDate = await sql.query(`SELECT COUNT(*) as count, DATE(profile_view.time) as datetime FROM profile_view WHERE viewedUserId = '${applicantId}' AND time BETWEEN NOW() - INTERVAL 30 DAY AND NOW() GROUP BY datetime`)
  console.log(viewsVsDate)
  return viewsVsDate
}
