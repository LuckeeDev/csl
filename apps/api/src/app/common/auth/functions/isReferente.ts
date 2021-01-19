import { NextFunction, Request, Response } from 'express';
import { ICommissione } from '@csl/shared';
import { unauthorized } from '../utils';

export function isReferente(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const params: any = req.params;
  const commissione: ICommissione['id'] = params.id;

  if (
    req.user &&
    ((commissione === 'comitato' && req.user.isRappre) ||
      req.user.isReferente === commissione)
  ) {
    next();
  } else {
    unauthorized(res);
  }
}
