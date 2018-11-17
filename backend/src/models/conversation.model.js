'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const conversationSchema = new Schema({
  first_participant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  second_participant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  history: {
    type: [messageSchema]
  },
  initialized: {
    type: Boolean
  }

}, {
  timestamps: true
})

conversationSchema.method({
  transform () {
    const transformed = {}
    const fields = ['first_participant', 'second_participant', 'history', 'initialized']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

// module.exports = {
//   'Conversation': mongoose.model('Conversation', conversationSchema),
//   'conversationSchema': conversationSchema
// }
module.exports = mongoose.model('Conversation', conversationSchema)
