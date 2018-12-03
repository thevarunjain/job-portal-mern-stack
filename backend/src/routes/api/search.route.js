'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const cache = require('../../middlewares/cache')
const searchController = require('../../controllers/search.controller')
const validator = require('express-validation')
const { jobs, users } = require('../../validations/search.validation')

router.get('/', auth(), searchController.getAll)
router.get('/jobs', auth(), searchController.getJobs)
router.get('/users', auth(), searchController.getUsers)
router.post('/jobs', auth(), validator(jobs), cache, searchController.getFilteredJobs)
router.post('/users', auth(), validator(users), searchController.getFilteredUsers)

module.exports = router
