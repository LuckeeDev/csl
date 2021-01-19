import { IUser } from '@csl/shared';

declare module 'express' {
  interface Request<BodyType = Record<string, any>> {
    user: IUser;
    body: BodyType;
  }
}
