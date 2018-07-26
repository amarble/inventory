import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';

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
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true
  }
}, {collection: 'users'});

UserSchema.plugin(bcrypt);

UserSchema.index({ email: 1 });

module.exports  = exports = mongoose.model('User', UserSchema);
