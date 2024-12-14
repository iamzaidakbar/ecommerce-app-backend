import winston from 'winston';
import env from './env';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.metadata({ 
      fillWith: ['environment', 'service', 'baseUrl'] 
    })
  ),
  defaultMeta: {
    environment: env.NODE_ENV,
    service: 'ecommerce-api',
    baseUrl: env.BASE_URL
  },
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;  // Export the logger 