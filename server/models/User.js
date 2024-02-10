const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  patientName: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  patientSsn: {
    type: String,
    trim: false,
  },
  dob: {
    type: String,
    trim: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  Role_type: {
    type: String,
    default: "patient",
  },
  // Doctor's offices including Hospital Medical Doctors 
  Providers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Provider',
    },
  ],
  Patients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
