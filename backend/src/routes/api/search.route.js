'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const searchController = require('../../controllers/search.controller')

router.get('/', auth(), searchController.getAll)
router.get('/jobs', auth(), searchController.getJobs)
router.get('/users', auth(), searchController.getUsers)
router.post('/jobs', auth(), searchController.getFilteredJobs)
router.post('/users', auth(), searchController.getFilteredUsers)

module.exports = router
