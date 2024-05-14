import mongoose, { Schema } from 'mongoose';

const tokenSchema = new Schema({
  value: { type: String, required: true },
  clientId: { type: String, required: true }
});

export const Token = mongoose.model.Token || mongoose.model('Token', tokenSchema);
