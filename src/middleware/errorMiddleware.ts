import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { ResponseError } from '../error/responseError';

export const errorMiddleware = (
  err: Error | z.ZodError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof z.ZodError) {
    return res
      .status(400)
      .json({ error: 'Validation failed', details: err.issues })
      .end();
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        error: err.message,
      })
      .end();
  }

  res
    .status(500)
    .json({ error: `Internal server error ${err}` })
    .end();
};
