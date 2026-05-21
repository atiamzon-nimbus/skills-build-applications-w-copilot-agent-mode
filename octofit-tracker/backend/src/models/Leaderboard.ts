import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: Number
});

export default mongoose.model('Leaderboard', leaderboardSchema);
