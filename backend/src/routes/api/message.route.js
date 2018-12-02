'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const messagesController = require('../../controllers/message.controller')
const validator = require('express-validation')
const { fetch, send } = require('../../validations/message.validation')
const { threadId } = require('../../validations/common.validation')

router.post('/', auth(), validator(fetch), messagesController.newThread)
router.get('/findByUser', auth(), messagesController.getInbox)
router.get('/:threadId', auth(), validator(threadId), messagesController.getOne)
router.put('/:threadId', auth(), validator(threadId), validator(send), messagesController.putOne)

module.exports = router
