import mongoose, { Schema } from 'mongoose';

const clientSchema = new Schema({
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true }
});

const Client = mongoose.model.Client || mongoose.model('Client', clientSchema);
export default Client;
