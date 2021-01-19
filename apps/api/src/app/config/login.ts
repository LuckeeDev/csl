import { NextFunction, Request, Response } from 'express';

export const nextMiddelware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.returnTo = req.params.next;
  next();
};
