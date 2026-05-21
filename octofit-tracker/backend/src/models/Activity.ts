import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: Number, // in minutes
  calories: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Activity', activitySchema);
