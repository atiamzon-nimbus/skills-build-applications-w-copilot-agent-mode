import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
