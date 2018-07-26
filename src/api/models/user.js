import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import crypto from 'crypto';
import { addDays } from 'date-fns';

export const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
  },
  name: {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    }
  },
  reset: {
    token: String,
    expires: Date
  }
}, {collection: 'users'});

UserSchema.pre('create', function (next) {
  let token;
  const expires = addDays(new Date(), 1);
  crypto.randomBytes(128, (err, buff) => token = buff.toString('hex'));
  this.reset = { token: token, expires: expires };
  next();
});

UserSchema.plugin(bcrypt);
UserSchema.index({ email: 1 });

module.exports  = exports = mongoose.model('User', UserSchema);
