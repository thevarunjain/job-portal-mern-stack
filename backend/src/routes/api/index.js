'use strict'
const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')
const usersRouter = require('./users.route')
const jobsRouter = require('./jobs.route')

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/jobs', jobsRouter)
// router.use('/search', searchRouter)
// router.use('/message', messageRouter)

module.exports = router
