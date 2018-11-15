'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const validator = require('express-validation')
const { create } = require('../../validations/user.validation')
// const auth = require('../../middlewares/authorization')

router.post('/signup', validator(create), authController.register) // validate and register
router.post('/login', authController.login) // login

module.exports = router
