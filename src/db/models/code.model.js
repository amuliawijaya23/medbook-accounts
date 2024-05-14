import mongoose, { Schema } from 'mongoose';

const codeSchema = new Schema({
  value: { type: String, required: true },
  redirectUri: { type: String, required: true },
  clientId: { type: String, required: true }
});

export const Code = mongoose.model.Code || mongoose.model('Code', codeSchema);
export const createCode = (values) => new Code(values).save().then((code) => code.toObject());
export const getCodeByValue = (value) => Code.findOne({ value });
