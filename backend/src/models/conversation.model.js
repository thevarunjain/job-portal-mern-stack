'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


const conversationSchema = new Schema({
  first_participant: {
    type: String,
    required: true
  },
  second_participant: {
    type: String,
    required: true
  },
  history: {
    type: [messageSchema]
  },
  initialized: {
    type: Boolean,
    required: true
  }

}, {
  timestamps: true
});

conversationSchema.method({
  transform () {
    const transformed = {};
    const fields = ['first_participant', 'second_participant', 'history', 'initialized'];
    fields.forEach((field) => {
      transformed[field] = this[field]
    });
    return transformed
  }
});

module.exports = {
  'Conversation': mongoose.model('Conversation', conversationSchema),
  'conversationSchema': conversationSchema
};
