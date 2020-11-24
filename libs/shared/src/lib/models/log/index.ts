import { Document } from 'mongoose';
import { IUser } from '../user';

export interface ILogMetadata {
  user: IUser['email'];
  category: 'commissioni' | 'orders' | 'payments' | 'qp' | 'logs' | 'accounts';
  newState?: boolean;
  err?: string;
}

export interface ILog {
  timestamp: Date;
  level: 'info' | 'error';
  message: string;
  meta: ILogMetadata;
}

export interface ILogModel extends Document {}
