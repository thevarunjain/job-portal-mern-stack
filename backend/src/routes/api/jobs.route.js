'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const jobsController = require('../../controllers/jobs.controller')

router.get('/', auth(), jobsController.get)
router.post('/', auth(), jobsController.post)
router.get('/:jobId', auth(), jobsController.getOne)
router.put('/:jobId', auth(), jobsController.putOne)
router.delete('/:jobId', auth(), jobsController.deleteOne)
// router.post('/:jobId/save', auth(), jobsController.postOneSave)
// router.post('/:jobId/apply', auth(), jobsController.postOneApply)

module.exports = router
