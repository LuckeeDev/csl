import { NextFunction, Request, Response } from 'express';
import { unauthorized } from '../utils';

export function isPowerful(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user && (req.user.isVice || req.user.isRappre || req.user.isBar)) {
    next();
  } else {
    unauthorized(res);
  }
};
