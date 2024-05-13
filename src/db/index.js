import mongoose from 'mongoose';

async function dbConnect(MONGODB_URL) {
  try {
    if (!MONGODB_URL || MONGODB_URL.length === 0) {
      throw new Error('Please add your MongoDB URL');
    }

    mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('error', (error) => console.log(error));
    mongoose.connection.once('connected', () => console.log('Database Connected'));
  } catch (error) {
    throw new Error(error);
  }
}

export default dbConnect;
