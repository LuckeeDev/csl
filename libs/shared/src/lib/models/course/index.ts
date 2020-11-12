import { Document } from 'mongoose';
import { IUser } from '../user';

export interface ICourse {
  id: string;
  title: string;
  description: string;
  notes: string;
  duration: number;
  slots: string[];
  owner: IUser['id'];
  speakers: IUser['email'][];
  status: 'APPROVED' | 'WAITING' | 'DECLINED';
}

export interface ICourseModel extends Document, ICourse {
  id: string;
}
