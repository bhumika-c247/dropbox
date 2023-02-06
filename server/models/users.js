"use strict";

import mongoose from "mongoose";

const { Schema } = mongoose;

const UserModelSchema = new Schema({

  firstName: { type: String, required: true, },
  lastName: { type: String, required: true, },
  email: { type: String, required: true, },
  password: { type: String, required: false, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserModelSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

UserModelSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

UserModelSchema.pre('findOneAndUpdate', function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

export default mongoose.model('user', UserModelSchema);