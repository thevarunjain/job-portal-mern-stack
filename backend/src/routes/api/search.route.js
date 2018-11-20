'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const searchController = require('../../controllers/search.controller')

router.get('/', auth(), searchController.getAll)
router.get('/jobs', auth(), searchController.getJobs)
router.get('/users', auth(), searchController.getUsers)

module.exports = router
