import { NextFunction, Request, Response } from 'express';
import { unauthorized } from '../utils';

export function isVice(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.isVice) {
    next();
  } else {
    unauthorized(res);
  }
}
