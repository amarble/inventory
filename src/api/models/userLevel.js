import mongoose, { Schema } from 'mongoose';

export const UserLevelSchema = new Schema({
  level: {
    type: Number,
    index: true,
    unique: true,
  },
  description: {
    type: String,
    lowercase: true,
    trim: true
  }
}, {collection: 'userLevels'});

UserLevelSchema.index({ level: 1 });

module.exports  = exports = mongoose.model('UserLevel', UserLevelSchema);
