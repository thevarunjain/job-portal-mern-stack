'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const usersController = require('../../controllers/users.controller')
const dashboardController = require('../../controllers/dashboard.controller')

router.get('/', auth(), usersController.getAll)
router.get('/:userId', auth(), usersController.getOne)
router.put('/:userId', auth(), usersController.putOne)
router.delete('/:userId', auth(), usersController.deleteOne)
router.get('/dashboard', auth(), dashboardController.generateDashboardData)
router.post('/:userId/connect', auth(), usersController.connect)
router.get('/:userId/connections', auth(), usersController.connections)
// router.post('/:userId/mutual', auth(), usersController.mutual)
module.exports = router
