'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const logController = require('../../controllers/log.controller')

router.put('/profileView/:userId', auth(), logController.profileView)

module.exports = router
