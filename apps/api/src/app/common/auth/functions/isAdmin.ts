import { NextFunction, Request, Response } from 'express';
import { unauthorized } from '../utils';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    unauthorized(res);
  }
};
