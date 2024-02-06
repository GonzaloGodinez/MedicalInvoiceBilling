const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const patientSchema = new Schema({
  patientName: {
    type: String,
    required: 'You need to leave a patient!',
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
  patientTel: {
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
