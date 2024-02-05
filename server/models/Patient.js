const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const patientSchema = new Schema({
  patientName: {
    type: String,
    required: 'You need to leave a patient name!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  patientSSN: {
    type: Number,
    required: true,
    trim: false,
  },
  patientAddress: {
    type: String,
    required: true,
    trim: false,
  },
  patientAddress1: {
    type: String,
    required: true,
    trim: false,
  },
  patientTel: {
    type: String,
    required: true,
    trim: false,
  },
  patientZip: {
    type: String,
    required: true,
    trim: false,
  },
patientDob: {
  type: String,
  required: true,
  trim: false,
},

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Patient = model('Patient', patientSchema);

module.exports = Patient;
