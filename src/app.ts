import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import env from './config/env';

// Route imports
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import reviewRoutes from './routes/reviewRoutes';
import wishlistRoutes from './routes/wishlistRoutes';
import paymentRoutes from './routes/paymentRoutes';
import cartRoutes from './routes/cartRoutes';

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Move root route before other routes
app.get('/', (_req, res) => {
  console.log('Root route hit');  // Add logging
  res.status(200).json({ 
    message: 'Welcome to E-commerce API',
    version: env.API_VERSION,
    status: 'active',
    timestamp: new Date().toISOString(),
    endpoints: {
      api: `/api/${env.API_VERSION}`,
      health: '/health',
      docs: '/api/v1/docs'
    }
  });
});

// Move API routes after root route
const apiVersion = env.API_VERSION;
app.use(`/api/${apiVersion}/auth`, authRoutes);
app.use(`/api/${apiVersion}/users`, userRoutes);
app.use(`/api/${apiVersion}/products`, productRoutes);
app.use(`/api/${apiVersion}/orders`, orderRoutes);
app.use(`/api/${apiVersion}/reviews`, reviewRoutes);
app.use(`/api/${apiVersion}/wishlist`, wishlistRoutes);
app.use(`/api/${apiVersion}/payments`, paymentRoutes);
app.use(`/api/${apiVersion}/cart`, cartRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root route
app.get('/', (_req, res) => {
  res.status(200).json({ 
    message: 'Welcome to E-commerce API',
    version: env.API_VERSION,
    docs: '/api/v1/docs',
    health: '/health'
  });
});


export default app;