import { NextFunction, Request, Response } from 'express';
import { unauthorized } from '../utils';

export function isRappreDiClasse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user && req.user.isRappreDiClasse) {
    next();
  } else {
    unauthorized(res);
  }
}
