import { NextFunction, Request, Response } from 'express';

export function loginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.session.returnTo = req.params.next;
  next();
};
