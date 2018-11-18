'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const usersController = require('../../controllers/users.controller')
// const validator = require('express-validation')
// const { create } = require('../../validations/user.validation')
// const auth = require('../../middlewares/authorization')

router.get('/', auth(), usersController.getAll)
router.get('/:userId', auth(), usersController.getOne)

module.exports = router
