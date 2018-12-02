'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const jobsController = require('../../controllers/jobs.controller')
const applicationController = require('../../controllers/application.controller')

router.get('/', auth(), jobsController.get)
router.post('/', auth(['recruiter']), jobsController.post)
router.get('/recommendation', auth(['applicant']), jobsController.recommendation)
router.get('/:jobId', auth(), jobsController.getOne)
router.put('/:jobId', auth(['recruiter']), jobsController.putOne)
router.delete('/:jobId', auth(['recruiter']), jobsController.deleteOne)
router.post('/:jobId/save', auth(['applicant']), applicationController.save)
router.post('/:jobId/apply', auth(['applicant']), applicationController.apply)
router.post('/:jobId/easyApply', auth(['applicant']), applicationController.easyApply)

module.exports = router
