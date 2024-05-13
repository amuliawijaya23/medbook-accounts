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

const User = mongoose.model.User || mongoose.model('User', userSchema);
export default User;
