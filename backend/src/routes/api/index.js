'use strict'

const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')
const usersRouter = require('./users.route')
const jobsRouter = require('./jobs.route')
const messageRouter = require('./message.route')
const searchRouter = require('./search.route')
const logRouter = require('./log.route')
router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/jobs', jobsRouter)
router.use('/search', searchRouter)
router.use('/message', messageRouter)
router.use('/log', logRouter)
module.exports = router
