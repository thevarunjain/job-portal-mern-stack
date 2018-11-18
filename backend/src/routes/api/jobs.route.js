'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const jobsController = require('../../controllers/jobs.controller')

router.get('/', auth(), jobsController.get)
router.post('/', auth(['recruiter']), jobsController.post)
router.get('/:jobId', auth(), jobsController.getOne)
router.put('/:jobId', auth(['recruiter']), jobsController.putOne)
router.delete('/:jobId', auth(['recruiter']), jobsController.deleteOne)
// router.post('/:jobId/save', auth(['applicant']), jobsController.postOneSave)
// router.post('/:jobId/apply', auth(['applicant']), auth(), jobsController.postOneApply)

module.exports = router
