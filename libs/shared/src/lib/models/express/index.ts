import { Request } from 'express';
import { IUser } from '../user';

export interface IRequest<BodyType = any> extends Request {
  user: IUser;
  body: BodyType;
}
