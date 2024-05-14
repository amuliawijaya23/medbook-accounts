import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  medical_records: {
    type: {
      medication: [
        {
          name: { type: String, required: true },
          dose: { type: String, required: true },
          frequency: { type: String, required: true }
        }
      ]
    },
    select: false
  }
});

export const User = mongoose.model.User || mongoose.model('User', userSchema);

export const getUserById = (id) => User.findById(id);
export const createUser = (values) => new User(values).save().then((user) => user.toObject());
export const getUserByEmail = (email) => User.findOne({ email });
