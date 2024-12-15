import mongoose from 'mongoose';
import env from './env';

export const connectDB = async () => {
  try {
    if (!env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(env.MONGODB_URI);
    
    if (conn.connection.host) {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      console.log('MongoDB Connected but host is undefined');
    }

    return conn;
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error; // Let the calling function handle the error
  }
};

// Remove event listeners as they don't work well in serverless
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

export default connectDB;
