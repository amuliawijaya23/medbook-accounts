import mongoose, { Schema } from 'mongoose';

const codeSchema = new Schema({});

export const Code = mongoose.model.Code || mongoose.model('Code', codeSchema);
