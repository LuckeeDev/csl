import { NextFunction, Request, Response } from 'express';

export function isNotSignedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    res.redirect('../dashboard');
  } else {
    next();
  }
};
