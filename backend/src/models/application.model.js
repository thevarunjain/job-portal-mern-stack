'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = require('./name.model');

const applicationSchema = new Schema({
  name: {
    type: name.schema,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  cover_letter: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  diversity: {
    type: Boolean,
    required: true
  },
  sponsorship: {
    type: Boolean,
    required: true
  },
  disability: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

applicationSchema.method({
  transform () {
    const transformed = {};
    const fields = ['name', 'address', 'resume', 'cover_letter', 'source', 'diversity', 'sponsorship', 'disability'];
    fields.forEach((field) => {
      transformed[field] = this[field]
    });
    return transformed
  }
});

module.exports = {
  'Application': mongoose.model('Application', applicationSchema),
  'applicationSchema': applicationSchema
};
