'use strict'

const express = require('express')
const router = express.Router()
const documentController = require('../../controllers/document.controller')
const auth = require('../../middlewares/authorization')
const upload = require('../../middlewares/upload')

router.post('/upload', auth(), upload.any(), documentController.upload)

module.exports = router
