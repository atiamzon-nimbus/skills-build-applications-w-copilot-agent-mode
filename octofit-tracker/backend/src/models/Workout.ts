import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  duration: Number // in minutes
});

export default mongoose.model('Workout', workoutSchema);
