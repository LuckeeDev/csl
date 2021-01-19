import { NextFunction, Request, Response } from 'express';
import { unauthorized } from '../utils';

export function isSignedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    unauthorized(res);
  }
};
