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

// Favicon handler - Add this before other routes
app.get('/favicon.ico', (_req, res) => {
  // Option 1: If you have a favicon file in public folder
  // res.sendFile(path.join(__dirname, '../public/favicon.ico'));

  // Option 2: Return a base64 encoded favicon
  res.writeHead(200, { 'Content-Type': 'image/x-icon' });
  res.end(Buffer.from('AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFtbWwBbW1sAW1tbAFtbWwBbW1sAW1tbAFtbWwBbW1sAW1tbAFtbWwAAAAAAAAAAAAAAAAAAAAAAW1tbAFtbWyhbW1t/W1tblFtbW5RbW1uUW1tblFtbW5RbW1uUW1tbf1tbWyhbW1sAAAAAAAAAAAAAAAAAAAAAAFtbWyhbW1vUW1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW9RbW1soAAAAAAAAAAAAAAAAW1tbAFtbW39bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1t/W1tbAAAAAABbW1sAW1tbKFtbW9RbW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1vUW1tbKFtbWwBbW1sAW1tbf1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tbf1tbWwBbW1uUW1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tblFtbW5RbW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tblFtbW5RbW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tblFtbW5RbW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tblFtbWwBbW1t/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1t/W1tbAFtbWwBbW1soW1tb1FtbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW9RbW1soW1tbAFtbWwBbW1sAW1tbf1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW39bW1sAAAAAAAAAAAAAAAAAAAAAAFtbWyhbW1vUW1tb/1tbW/9bW1v/W1tb/1tbW/9bW1v/W1tb/1tbW9RbW1soAAAAAAAAAAAAAAAAAAAAAAAAAABbW1sAW1tbKFtbW39bW1uUW1tblFtbW5RbW1uUW1tblFtbW5RbW1t/W1tbKFtbWwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbW1sAW1tbAFtbWwBbW1sAW1tbAFtbWwBbW1sAW1tbAFtbWwBbW1sAAAAAAAAAAAAAAAAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAA==', 'base64'));
});

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

export default app;