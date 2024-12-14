import app from '../src/app';
import { connectDB } from '../src/config/db';

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected in serverless function'))
  .catch(err => console.error('MongoDB connection error:', err));

// Add request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

export default app; 