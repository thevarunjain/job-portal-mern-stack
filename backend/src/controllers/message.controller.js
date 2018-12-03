/* eslint-disable camelcase */
'use strict'

const httpStatus = require('http-status')
const mongoose = require('mongoose')
const APIError = require('../utils/APIError')
// const User = require('../models/user.model')
const Recruiter = require('../models/recruiter.model')
const Applicant = require('../models/applicant.model')
const Thread = require('../models/conversation.model')
const sql = require('./../services/sql')

// router.post('/', auth(), messagesController.newThread)
exports.newThread = async (req, res, next) => {
  try {
    const response = { payLoad: {} }
    if (!mongoose.Types.ObjectId.isValid(req.body.to)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    const first_participant = req.user._id > req.body.to ? req.body.to : req.user._id
    const second_participant = req.user._id > req.body.to ? req.user._id : req.body.to
    const result = await Thread.findOne({first_participant, second_participant}).exec()
    if (result) {
      response.payLoad = result
    } else {
      const thread = new Thread({ first_participant, second_participant })
      const newThread = await thread.save()
      const conversationPointers = {
        'thread_id': newThread._id,
        'user_id': newThread.first_participant
      }
      await sql.query('INSERT INTO conversation SET ?', conversationPointers)
      conversationPointers.user_id = newThread.second_participant
      await sql.query('INSERT INTO conversation SET ?', conversationPointers)
      response.payLoad = newThread
    }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

// router.get('/findByUser', auth(), messagesController.getInbox)
exports.getInbox = async (req, res, next) => {
  try {
    // console.log('\n\n\n', req.user.role, '\n\n\n')
    const response = { payLoad: [] }
    const User = req.user.role === 'applicant' ? Applicant : Recruiter
    const currentUser = await User.findOne({id: req.user._id}).exec()
    const threadList = await sql.query(`SELECT * FROM conversation WHERE user_id = '${req.user._id}'`)
    for (let index = 0; index < threadList.length; index++) {
      const element = threadList[index]
      const thread = await Thread.findById(element.thread_id).exec()
      const receiverId = thread.first_participant === req.user._id ? thread.second_participant : thread.first_participant
      const receiverApplicant = await Applicant.findOne({id: receiverId}).exec()
      const receiverRecruiter = await Recruiter.findOne({id: receiverId}).exec()
      const receiver = receiverApplicant === null ? receiverRecruiter : receiverApplicant
      const threadData = {
        thread,
        sender: currentUser.identityTransform(),
        receiver: receiver.identityTransform()
      }
      response.payLoad.push(threadData)
    }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

// router.get('/:threadId', auth(), messagesController.getOne)
exports.getOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.threadId)) throw new APIError(`Invalid threadId`, httpStatus.BAD_REQUEST)
    const response = { payLoad: {} }
    const thread = await Thread.findById(req.params.threadId).exec()
    response.payLoad = thread
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

// router.put('/:threadId', auth(), messagesController.putOne)
exports.putOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.threadId)) throw new APIError(`Invalid threadId`, httpStatus.BAD_REQUEST)
    const response = { payLoad: {} }
    const thread = await Thread.findById(req.params.threadId).exec()
    const message = {
      sender: req.user._id,
      body: req.body.message
    }
    thread.history.push(message)
    const newThread = await thread.save()
    response.payLoad = newThread
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
