'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const jobsController = require('../../controllers/jobs.controller')
const applicationController = require('../../controllers/application.controller')
const validator = require('express-validation')
const { create, update, apply, easyApply } = require('../../validations/jobs.validation')
const { jobId } = require('../../validations/common.validation')

router.get('/applied/count', auth(['applicant']), applicationController.fetchAppliedCount)
router.get('/applied', auth(['applicant']), applicationController.fetchApplied)
router.get('/saved/count', auth(['applicant']), applicationController.fetchSavedCount)
router.get('/saved', auth(['applicant']), applicationController.fetchSaved)
router.get('/', auth(), jobsController.get)
router.post('/', auth(['recruiter']), validator(create), jobsController.post)
router.get('/recommendation', auth(['applicant']), jobsController.recommendation)
router.get('/:jobId', auth(), validator(jobId), jobsController.getOne)
router.put('/:jobId', auth(['recruiter']), validator(jobId), validator(update), jobsController.putOne)
router.delete('/:jobId', auth(['recruiter']), validator(jobId), jobsController.deleteOne)
router.post('/:jobId/save', auth(['applicant']), validator(jobId), applicationController.save)
router.post('/:jobId/unsave', auth(['applicant']), validator(jobId), applicationController.unsave)
router.post('/:jobId/apply', auth(['applicant']), validator(jobId), validator(apply), applicationController.apply)
router.post('/:jobId/easyApply', auth(['applicant']), validator(jobId), validator(easyApply), applicationController.easyApply)

module.exports = router
