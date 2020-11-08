import { NextFunction, Response } from 'express';
import { IRequest } from '@csl/shared';

export const nextMiddelware = (req: IRequest, res: Response, next: NextFunction) => {
  req.session.returnTo = req.params.next;
  next();
}
