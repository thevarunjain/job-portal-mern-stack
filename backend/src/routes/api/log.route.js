'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const logController = require('../../controllers/log.controller')

router.put('/click/:jobId', auth(), logController.click)
router.put('/startApplication/:jobId', auth(), logController.startApplication)
router.put('/profileView/:userId', auth(), logController.profileView)

module.exports = router
