'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const usersController = require('../../controllers/users.controller')

router.get('/', auth(), usersController.getAll)
router.get('/:userId', auth(), usersController.getOne)
router.put('/:userId', auth(), usersController.putOne)
router.delete('/:userId', auth(), usersController.deleteOne)

module.exports = router
