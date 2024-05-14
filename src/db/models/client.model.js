import mongoose, { Schema } from 'mongoose';

const clientSchema = new Schema({
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true }
});

export const Client = mongoose.model.Client || mongoose.model('Client', clientSchema);

export const createClient = (values) =>
  new Client(values).save().then((client) => client.toObject());
export const getClientByClientId = (clientId) => Client.findOne({ clientId });
