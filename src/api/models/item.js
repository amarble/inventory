import mongoose, { Schema } from 'mongoose';
import Vendor from './vendor';
import Method from './method';

export const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  purchase: {
    price: Number,
    date: Date,
    vendor: {
      type: String,
      lowercase: true,
      trim: true
    },
    notes: String,
  },
  shipmentIn: {
    date: Date,
    method: {
      type: String,
      lowercase: true,
      trim: true
    },
    tracking: String,
    notes: String,
  },
  delivery: {
    date: Date,
    notes: String,
  },
  listing: {
    price: Number,
    date: Date,
    vendor: {
      type: String,
      lowercase: true,
      trim: true
    },
  },
  sale: {
    price: Number,
    date: Date,
    vendor: {
      type: String,
      lowercase: true,
      trim: true
    },
  },
  shipmentOut: {
    date: Date,
    method: {
      type: String,
      lowercase: true,
      trim: true
    },
    tracking: String,
    notes: String,
  },
  category: String,
  tags: [String],
}, {collection: 'items'});

ItemSchema.pre('save', function (next) {
  if (this.purchase) {
    Vendor.findOneAndUpdate({name: this.purchase.vendor}, {name: this.purchase.vendor}, {upsert: true});
  }
  if (this.listing) {
    Vendor.findOneAndUpdate({name: this.listing.vendor}, {name: this.listing.vendor}, {upsert: true});
  }
  if (this.sale) {
    Vendor.findOneAndUpdate({name: this.sale.vendor}, {name: this.sale.vendor}, {upsert: true});
  }
  if (this.shipmentIn) {
    Method.findOneAndUpdate({name: this.shipmentIn.method}, {name: this.shipmentIn.method}, {upsert: true});
  }
  if (this.shipmentOut) {
    Method.findOneAndUpdate({name: this.shipmentOut.method}, {name: this.shipmentOut.method}, {upsert: true});
  }
  next();
});

module.exports  = exports = mongoose.model('Item', ItemSchema);
