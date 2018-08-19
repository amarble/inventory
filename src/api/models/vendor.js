import mongoose, { Schema } from 'mongoose';

export const VendorSchema = new Schema({
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
}, {collection: 'vendors'});

VendorSchema.index({ name: 1 });

module.exports  = exports = mongoose.model('Vendor', VendorSchema);
