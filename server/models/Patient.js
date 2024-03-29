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
  patientSsn: {
    type: String,
    required: true,
    trim: false,
  },
//   patientAddress: {
//     type: String,
//     required: true,
//     trim: false,
//   },
//   patientAddress1: {
//     type: String,
//     required: true,
//     trim: false,
//   },
//   patientTel: {
//     type: String,
//     required: true,
//     trim: false,
//   },
//   patientZip: {
//     type: String,
//     required: true,
//     trim: false,
//   },
// dob: {
//   type: String,
//   required: true,
//   trim: false,
// },
// diagnosticCode: {
//   type: String,
//   required: true,
//   trim: false,
// },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

module.exports = patientSchema;
