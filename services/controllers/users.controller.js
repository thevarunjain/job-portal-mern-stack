'use strict'

const httpStatus = require('http-status')
const mongoose = require('mongoose')
const APIError = require('../utils/APIError')
const User = require('../models/user.model')
const Recruiter = require('../models/recruiter.model')
const Applicant = require('../models/applicant.model')

const neo4jSession = require('../services/graph')
exports.getAll = async (req, res, next) => {
  try {
    // console.log('\n\n\n', req.user.role, '\n\n\n')
    const response = {payLoad: {}}
    const recruiter = await Recruiter.find().exec()
    const applicant = await Applicant.find().exec()
    response.payLoad = { applicant, recruiter }
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

exports.getOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    const response = {payLoad: {}}
    let user = await Applicant.findOne({id: req.params.userId}).exec()
    if (!user) {
      user = await Recruiter.findOne({id: req.params.userId}).exec()
      response.payLoad.role = 'recruiter'
    } else {
      response.payLoad.role = 'applicant'
    }
    response.payLoad.user = user
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    next(error)
  }
}

exports.putOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    const userId = req.params.userId
    const response = {payLoad: {}, message: ''}
    const userAccount = await User.findById(userId).exec()
    if (!userAccount) throw new APIError(`No user associated with id: ${userId}`, httpStatus.NOT_FOUND)
    const role = userAccount.role
    const user = role === 'applicant' ? Applicant : Recruiter
    let userDetails = await user.findOne({id: userId}).exec()
    for (const key in req.body) {
      if (user.schema.obj.hasOwnProperty(key) && key !== 'id' && key !== '_id') {
        userDetails[key] = req.body[key]
      }
    }
    const updatedUserDetails = await userDetails.save()
    if (updatedUserDetails) {
      response.message = 'SUCCESS'
      response.payLoad = updatedUserDetails
      res.status(httpStatus.OK)
      res.send(response)
    } else {
      throw new APIError(`User with id: ${userId} not updated`, httpStatus.NOT_FOUND)
    }
  } catch (error) {
    next(error)
  }
}

exports.deleteOne = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    const userId = req.params.userId
    const response = {payLoad: {}, message: ''}
    const userAccount = await User.findById(userId).exec()
    if (!userAccount) throw new APIError(`No user associated with id: ${userId}`, httpStatus.NOT_FOUND)
    const role = userAccount.role
    const user = role === 'applicant' ? Applicant : Recruiter
    const deleteAccount = await User.findByIdAndDelete(userId).exec()
    const deleteResult = await user.findOneAndDelete({id: userId}).exec()
    if (deleteAccount && deleteResult) {
      response.message = 'SUCCESS'
      res.status(httpStatus.OK)
      res.send(response)
    } else {
      throw new APIError(`User with id: ${userId} not deleted`, httpStatus.NOT_FOUND)
    }
  } catch (error) {
    next(error)
  }
}

exports.connections = async (req, res, next) => {
  console.log('tt')
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    const connectToUser = req.params.userId
    console.log('connect to user', connectToUser)
    const response = {payLoad: {}}
    const userAccount = await User.findById(connectToUser).exec()
    if (!userAccount) throw new APIError(`No user associated with id: ${connectToUser}`, httpStatus.NOT_FOUND)
    let uId = '' + req.params.userId
    var connections = []
    var obj = {}
    let result = await neo4jSession.run('MATCH (a {userid:{emailadd}})--(b) return b', {emailadd: uId})
    console.log('rr', result)
    for (let index = 0; index < result.records.length; index++) {
      const conn = result.records[index]
      let temp = JSON.stringify(conn)
      console.log(JSON.parse(temp)._fields[0].properties)
      // connections.push(JSON.parse(temp)._fields[0].properties.userid)
      console.log('tyui', temp)
      let user = await Applicant.findOne({id: JSON.parse(temp)._fields[0].properties.userid}).exec()
      if (!user) {
        user = await Recruiter.findOne({ id: JSON.parse(temp)._fields[0].properties.userid }).exec()
        user.role = 'recruiter'
      } else {
        user.role = 'applicant'
      }
      console.log('user', user)
      connections.push(user)
    }
    if (connections.length === 0) {
      response.message = 'No connections'
    } else {
      response.message = 'SUCCESS'
    }
    obj.connections = connections
    console.log(obj)
    response.payLoad.connections = connections
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.connect = async (req, res, next) => {
  console.log('in connect')
  const tx = neo4jSession.beginTransaction()
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    const connectToUser = req.params.userId
    console.log('connect to user', connectToUser)
    const response = {payLoad: {}, message: ''}
    const userAccount = await User.findById(connectToUser).exec()
    if (!userAccount) throw new APIError(`No user associated with id: ${connectToUser}`, httpStatus.NOT_FOUND)
    // const user = role === 'applicant' ? Applicant : Recruiter
    // let userDetails = await user.findOne({id: userId}).exec()
    let loggedInUser1 = JSON.stringify(req.user._id)
    let loggedInUser = JSON.parse(loggedInUser1)
    console.log('loggedin user id', typeof (loggedInUser))
    console.log('loggedin user id', loggedInUser)

    let loggedInUserType = req.user.role
    console.log('loggedin role', typeof (loggedInUserType))
    let connectToUserType = userAccount.role
    console.log('connect to user type role', connectToUserType)
    let r1 = await tx.run('MATCH (a {userid:{loggedIn}}) return a.userid', { loggedIn: loggedInUser })
    console.log('1std', r1)
    if (r1.records.length !== 0) {
      let r2 = await tx.run('MATCH (b {userid:{connectTo}}) return b.userid', { connectTo: connectToUser })
      console.log('2nd', r1)
      if (r2.records.length !== 0) {
        await tx.run('Match (a {userid:{loggedIn}}),(b {userid:{connectTo}}) MERGE (a)-[:FRIEND]-(b) MERGE (b)-[:FRIEND]-(a) return a,b', { loggedIn: loggedInUser, connectTo: connectToUser })
      } else {
        await tx.run('CREATE (n:Person {userid:{email},type:{UserType}}) RETURN n.userid', { email: connectToUser, UserType: connectToUserType })
        await tx.run('Match (a {userid:{loggedIn}}),(b {userid:{connectTo}}) MERGE (a)-[:FRIEND]-(b) MERGE (b)-[:FRIEND]-(a) return a,b', { loggedIn: loggedInUser, connectTo: connectToUser })
      }
    } else {
      console.log('-------------------reached')

      await tx.run('CREATE (n:Person {userid:{email},type:{UserType}}) RETURN n.userid', { email: loggedInUser, UserType: loggedInUserType })

      let r3 = await tx.run('MATCH (b {userid:{connectTo}}) return b.userid', { connectTo: connectToUser })

      if (r3.records.length !== 0) {
        await tx.run('Match (a {userid:{loggedIn}}),(b {userid:{connectTo}}) MERGE (a)-[:FRIEND]-(b) MERGE (b)-[:FRIEND]-(a) return a,b', { loggedIn: loggedInUser, connectTo: connectToUser })
      } else {
        await tx.run('CREATE (n:Person {userid:{email},type:{UserType}}) RETURN n.userid', { email: connectToUser, UserType: connectToUserType })
        await tx.run('Match (a {userid:{loggedIn}}),(b {userid:{connectTo}}) MERGE (a)-[:FRIEND]-(b) MERGE (b)-[:FRIEND]-(a) return a,b', { loggedIn: loggedInUser, connectTo: connectToUser })
      }
    }
    tx.commit()
    response.message = 'SUCCESS'
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    tx.rollback()
    console.log(error)
    next(error)
  }
}

exports.mutual = async (req, res, next) => {
  console.log('tt')
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new APIError(`Invalid userId`, httpStatus.BAD_REQUEST)
    const connectToUser = req.params.userId
    console.log('connect to user', connectToUser)
    const response = {payLoad: {}, message: ''}
    const userAccount = await User.findById(connectToUser).exec()
    if (!userAccount) throw new APIError(`No user associated with id: ${connectToUser}`, httpStatus.NOT_FOUND)
    let uId = '' + req.params.userId
    var connections = []
    var obj = {}
    let result = await neo4jSession.run('MATCH (a {userid:{emailadd}})--(b)--(c) return c', {emailadd: uId})
    console.log('rr', result)
    for (let index = 0; index < result.records.length; index++) {
      const conn = result.records[index]
      let temp = JSON.stringify(conn)
      let user = await Applicant.findOne({id: JSON.parse(temp)._fields[0].properties.userid}).exec()
      if (!user) {
        user = await Recruiter.findOne({ id: JSON.parse(temp)._fields[0].properties.userid }).exec()
        user.role = 'recruiter'
      } else {
        user.role = 'applicant'
      }
      console.log('user', user)
      connections.push(user)
    }
    if (connections.length === 0) {
      response.message = 'No mutual connections'
    } else {
      response.message = 'SUCCESS'
    }
    obj.connections = connections
    response.payLoad.connections = connections
    res.status(httpStatus.OK)
    res.send(response)
  } catch (error) {
    console.log(error)
    next(error)
  }
}
