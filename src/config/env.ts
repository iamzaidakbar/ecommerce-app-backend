import dotenv from 'dotenv';
import path from 'path';

// Update the path to look for .env in the backend folder
dotenv.config({ path: path.join(__dirname, '../../.env') });

interface Environment {
  NODE_ENV: string;
  PORT: number;
  API_VERSION: string;
  MONGODB_URI: string;
  MONGODB_URI_TEST: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_COOKIE_EXPIRES_IN: number;
  BCRYPT_SALT_ROUNDS: number;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;
  CORS_ORIGIN: string;
  LOG_LEVEL: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  EMAIL_FROM: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  REDIS_URL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  NEXT_PUBLIC_STRIPE_KEY: string;
  BASE_URL: string;
  PRODUCTION_URL: string;
  STRIPE_WEBHOOK_ENDPOINT_LOCAL: string;
  STRIPE_WEBHOOK_ENDPOINT_PROD: string;
}

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'];

// Only check required vars in production
if (process.env.NODE_ENV === 'production') {
  console.log('Checking required environment variables in production mode');
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
} else {
  // In development, just log a warning if env vars are missing
  console.log('Checking required environment variables in development mode');
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.warn(`Warning: Missing environment variable ${envVar} in development mode`);
    }
  });
}

export const env: Environment = {
  // Server
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  API_VERSION: process.env.API_VERSION || 'v1',

  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
  MONGODB_URI_TEST: process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/ecommerce_test',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  JWT_COOKIE_EXPIRES_IN: parseInt(process.env.JWT_COOKIE_EXPIRES_IN || '7', 10),

  // Security
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10),
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),

  // Stripe
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
  NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY || '',
  // Redis
  REDIS_URL: process.env.REDIS_URL || '',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

  // Email
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '2525', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@example.com',

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',

  // URLs
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? (process.env.PRODUCTION_URL as string)
    : (process.env.BASE_URL || 'http://localhost:4000'),
  PRODUCTION_URL: process.env.PRODUCTION_URL as string || '',

  // Stripe Webhooks
  STRIPE_WEBHOOK_ENDPOINT_LOCAL: process.env.STRIPE_WEBHOOK_ENDPOINT_LOCAL || '/api/v1/payments/webhook',
  STRIPE_WEBHOOK_ENDPOINT_PROD: process.env.STRIPE_WEBHOOK_ENDPOINT_PROD || '',
};

export default env;
