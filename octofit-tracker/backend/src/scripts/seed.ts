/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const MONGO_URI = 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGO_URI);

  // Clear collections
  await User.deleteMany({});
  await Team.deleteMany({});
  await Activity.deleteMany({});
  await Leaderboard.deleteMany({});
  await Workout.deleteMany({});

  // Create teams
  const teams = await Team.insertMany([
    { name: 'OctoRunners', description: 'Running enthusiasts' },
    { name: 'FitSquad', description: 'General fitness team' }
  ]);

  // Create users
  const users = await User.insertMany([
    { username: 'alice', email: 'alice@example.com', password: 'pass123', team: teams[0]._id, profile: { age: 28, height: 165, weight: 60, bio: 'Runner' } },
    { username: 'bob', email: 'bob@example.com', password: 'pass123', team: teams[1]._id, profile: { age: 32, height: 175, weight: 75, bio: 'Lifter' } }
  ]);

  // Update teams with members
  await Team.findByIdAndUpdate(teams[0]._id, { $set: { members: [users[0]._id] } });
  await Team.findByIdAndUpdate(teams[1]._id, { $set: { members: [users[1]._id] } });

  // Create workouts
  const workouts = await Workout.insertMany([
    { name: '5K Run', description: 'Run 5 kilometers', difficulty: 'Medium', duration: 30 },
    { name: 'HIIT Session', description: 'High intensity interval training', difficulty: 'Hard', duration: 45 }
  ]);

  // Create activities
  const activities = await Activity.insertMany([
    { user: users[0]._id, type: 'Running', duration: 30, calories: 300 },
    { user: users[1]._id, type: 'Weightlifting', duration: 45, calories: 400 }
  ]);

  // Create leaderboard
  await Leaderboard.insertMany([
    { user: users[0]._id, score: 1200, rank: 1 },
    { user: users[1]._id, score: 900, rank: 2 }
  ]);

  console.log('Database seeded successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  mongoose.disconnect();
});
