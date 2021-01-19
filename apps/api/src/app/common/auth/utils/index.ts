import { Response } from 'express';

export function unauthorized(res: Response) {
  res.status(403).end();
}
