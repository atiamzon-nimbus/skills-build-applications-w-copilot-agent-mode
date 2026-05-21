import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  profile: {
    age: Number,
    height: Number,
    weight: Number,
    bio: String
  }
});

export default mongoose.model('User', userSchema);
