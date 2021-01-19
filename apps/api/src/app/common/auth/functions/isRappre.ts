import { NextFunction, Request, Response } from 'express';
import { unauthorized } from '../utils';

export function isRappre(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.isRappre) {
    next();
  } else {
    unauthorized(res);
  }
};
