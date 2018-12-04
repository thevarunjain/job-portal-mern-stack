'use strict'

const httpStatus = require('http-status')
const sql = require('./../services/sql')
const mongoose = require('mongoose')
// const APIError = require('../utils/APIError')
const Job = require('../models/job.model')
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
        hotJobGraph: await hotJobGraph(req.user._id),
        coldJobGraph: await coldJobGraph(req.user._id),
        cityHotJobGraph: await getCityHotJobGraph(req.user._id),
        clickOnJobGraph: await clickOnJobGraph(req.user._id),
        savedCount: await savedCountRecruiter(req.user._id),
        incompleteCount: await incompleteCountRecruiter(req.user._id),
        totalCount: 0
      }
      response.payLoad.totalCount = response.payLoad.savedCount + response.payLoad.incompleteCount
    }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
const getCityHotJobGraph = async (recruiter_id) => {
  const ObjectID = mongoose.Types.ObjectId
  var query = {
    'recruiter': new ObjectID(recruiter_id)
  }
  // const jobs = await Job.aggregate(
  //   [
  //     {$match: query},
  //     {$group: {_id: "$address.city", numberOfJobs: {$sum: 1}}}
  //   ]
  // )
  const jobsOfRecruiter = await Job.find(query)
  var result = {}
  for (let index = 0; index < jobsOfRecruiter.length; index++) {
    var job_id = jobsOfRecruiter[index]['_id']
    var job_title = jobsOfRecruiter[index]['title']
    var noOfApplications = await sql.query(`SELECT COUNT(*) as count FROM job_application WHERE job_id = '${job_id}'`)
    console.log(noOfApplications)
    if (result.hasOwnProperty(jobsOfRecruiter[index].address.city)) {
      result[jobsOfRecruiter[index].address.city].push([job_id, job_title, noOfApplications[0].count])
    } else {
      result[jobsOfRecruiter[index].address.city] = [[job_id, job_title, noOfApplications[0].count]]
    }
  }
  function Comparator (a, b) {
    if (a[2] < b[2]) return 1
    if (a[2] > b[2]) return -1
    return 0
  }
  for (let key in result) {
    result[key] = result[key].sort(Comparator)
  }
  return result
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
  const viewsVsDate = await sql.query(`SELECT COUNT(*) as count, DATE(profile_view.time) as datetime FROM profile_view WHERE viewedUserId = '${applicantId}' AND time BETWEEN NOW() - INTERVAL 30 DAY AND NOW() GROUP BY datetime`)
  return viewsVsDate
}

const hotJobGraph = async (recruiterId) => {
  const hotJob = await sql.query(`SELECT job_id as jobId, COUNT(DISTINCT application_id) as count FROM job_application where recruiter_id = '${recruiterId}' group by job_id order by count desc LIMIT 10;`)
  for (let index = 0; index < hotJob.length; index++) {
    const element = hotJob[index]
    hotJob[index].jobTitle = await getJobTitleById(element.jobId)
  }
  return hotJob
}

const coldJobGraph = async (recruiterId) => {
  const coldJob = await sql.query(`SELECT job_id as jobId, COUNT(DISTINCT application_id) as count FROM job_application where recruiter_id = '${recruiterId}' group by job_id order by count asc LIMIT 5;`)
  for (let index = 0; index < coldJob.length; index++) {
    const element = coldJob[index]
    coldJob[index].jobTitle = await getJobTitleById(element.jobId)
  }
  return coldJob
}

const clickOnJobGraph = async (recruiterId) => {
  const clickOnJob = await sql.query(`SELECT COUNT(*) as count, DATE(job_click.time) as datetime FROM job_click WHERE userId = '${recruiterId}' AND time BETWEEN NOW() - INTERVAL 30 DAY AND NOW() GROUP BY datetime`)
  return clickOnJob
}

const jobsByRecruiter = async (recruiterId) => {
  const jobList = await Job.find({ recruiter: recruiterId }).exec()
  const jobIdList = []
  for (let index = 0; index < jobList.length; index++) {
    const element = jobList[index]
    jobIdList.push(element._id)
  }
  return jobIdList
}

const savedCountRecruiter = async (recruiterId) => {
  let count = 0
  let jobIdList = await jobsByRecruiter(recruiterId)
  for (let index = 0; index < jobIdList.length; index++) {
    const jobId = jobIdList[index]
    const saved = await sql.query(`SELECT COUNT(*) as count FROM saved_job WHERE job_id = '${jobId}'`)
    count += saved[0].count
  }
  return count
}

const incompleteCountRecruiter = async (recruiterId) => {
  let count = 0
  let jobIdList = await jobsByRecruiter(recruiterId)
  for (let index = 0; index < jobIdList.length; index++) {
    const jobId = jobIdList[index]
    const saved = await sql.query(`SELECT COUNT(*) as count FROM incomplete_application WHERE jobId = '${jobId}'`)
    count += saved[0].count
  }
  return count
}

const getJobTitleById = async (jobId) => {
  const job = await Job.findById(jobId).exec()
  return job ? job.title : ''
}
