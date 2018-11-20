'use strict'

const httpStatus = require('http-status')
const sql = require('./../services/sql')
const mongoose = require('mongoose')
const APIError = require('../utils/APIError')



exports.profileView = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    const response = {payLoad: {}, message: ''}
    const saveProfileViewPointers = {
      'viewedUserId': req.params.userId,
      'userId': req.user._id,
      'time': new Date()
    }
    await sql.query('INSERT INTO profile_view SET ?', saveProfileViewPointers)
    response.message = 'SUCCESS'
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}
