const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const diagnosticSchema = new Schema({
  diagnosticName: {
    type: String,
    required: 'You need to leave a diagnostic!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  diagnosticCode: {
    type: String,
    required: true,
    trim: true,
  },
  diagnosticDescription: {
    type: String,
    required: true,
    trim: true,
  },
  diagnosticPrice: {
    type: String,
    required: true,
    trim: true,
  },
  Provider: {
      type: Schema.Types.ObjectId,
      ref: 'Provider',
    },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Diagnostic = model('Diagnostic', diagnosticSchema);

module.exports = Diagnostic;
