'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const validator = require('express-validation')
const { login, create, update } = require('../../validations/user.validation')
// const auth = require('../../middlewares/authorization')

router.post('/login', validator(login), authController.login) // login
router.post('/signup', validator(create), validator(update), authController.register) // validate and register

module.exports = router
