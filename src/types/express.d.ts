import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Add your custom properties here
    }
  }
}
