import { NextFunction, Request, Response } from 'express';
import { unauthorized } from '../utils';

export function isBar(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.isBar) {
    next();
  } else {
    unauthorized(res);
  }
};
