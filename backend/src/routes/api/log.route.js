'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const logController = require('../../controllers/log.controller')
const validator = require('express-validation')
// const { fetch, send } = require('../../validations/message.validation')
const { userId, jobId } = require('../../validations/common.validation')

router.put('/click/:jobId', auth(), validator(jobId), logController.click)
router.put('/startApplication/:jobId', auth(), validator(jobId), logController.startApplication)
router.put('/profileView/:userId', auth(), validator(userId), logController.profileView)

module.exports = router
