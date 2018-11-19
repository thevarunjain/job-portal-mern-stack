'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')
const messagesController = require('../../controllers/message.controller')

router.post('/', auth(), messagesController.newThread)
router.get('/findByUser', auth(), messagesController.getInbox)
router.get('/:threadId', auth(), messagesController.getOne)
router.put('/:threadId', auth(), messagesController.putOne)
router.delete('/:threadId', auth(), messagesController.deleteOne)

module.exports = router
