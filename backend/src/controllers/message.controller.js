/* eslint-disable camelcase */
'use strict'

const httpStatus = require('http-status')
const mongoose = require('mongoose')
const APIError = require('../utils/APIError')
// const User = require('../models/user.model')
// const Recruiter = require('../models/recruiter.model')
// const Applicant = require('../models/applicant.model')
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
    const threadList = await sql.query(`SELECT * FROM conversation WHERE user_id = '${req.user._id}'`)
    for (let index = 0; index < threadList.length; index++) {
      const element = threadList[index]
      const thread = await Thread.findById(element.thread_id).exec()
      response.payLoad.push(thread)
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
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    const response = { payLoad: {} }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

// router.put('/:threadId', auth(), messagesController.putOne)
exports.putOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    const response = { payLoad: {}, message: '' }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

// router.delete('/:threadId', auth(), messagesController.deleteOne)
exports.deleteOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    // const userId = req.params.userId
    const response = { payLoad: {}, message: '' }
    // const userAccount = await User.findById(userId).exec()
    // if (!userAccount) throw new APIError(`No user associated with id: ${userId}`, httpStatus.NOT_FOUND)
    // const role = userAccount.role
    // const user = role === 'applicant' ? Applicant : Recruiter
    // const deleteAccount = await User.findByIdAndDelete(userId).exec()
    // const deleteResult = await user.findOneAndDelete({ id: userId }).exec()
    // if (deleteAccount && deleteResult) {
    //   response.message = 'SUCCESS'
    res.status(httpStatus.OK)
    res.send(response)
    // } else {
    //   throw new APIError(`User with id: ${userId} not deleted`, httpStatus.NOT_FOUND)
    // }
  } catch (error) {
    next(error)
  }
}
