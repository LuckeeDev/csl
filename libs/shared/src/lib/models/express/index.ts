import { Request } from 'express';
import { IUser } from '../user';

export interface IRequest extends Request {
  user: IUser
}
