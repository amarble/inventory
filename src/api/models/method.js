import mongoose, { Schema } from 'mongoose';

export const MethodSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true,
  },
  url: String,
  phone: String,
  email: String,
  notes: String
}, {collection: 'methods'});

MethodSchema.index({ name: 1 });

module.exports  = exports = mongoose.model('Method', MethodSchema);
