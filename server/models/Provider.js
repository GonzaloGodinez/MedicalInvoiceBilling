const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const providerSchema = new Schema({
  providerName: {
    type: String,
    required: 'You need to leave a provider!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  providerSpecialty: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  patients: [
    {
      patientName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      patientSymptom: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Provider = model('Provider', providerSchema);

module.exports = Provider;
