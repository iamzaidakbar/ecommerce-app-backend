import app from '../src/app';
import { connectDB } from '../src/config/db';

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected successfully in serverless function');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    // Don't exit process in serverless environment
  });

// Add request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Add error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app; 