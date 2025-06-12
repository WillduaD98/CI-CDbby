import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI is not defined. Add it to your .env or GitHub secrets.');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

export default mongoose.connection;
