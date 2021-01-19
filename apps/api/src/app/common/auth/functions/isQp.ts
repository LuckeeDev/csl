import { NextFunction, Request, Response } from 'express';
import { unauthorized } from '../utils';

export function isQp(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.isQp) {
    next();
  } else {
    unauthorized(res);
  }
}
