import { Document } from 'mongoose';
import { IUser } from '../user';

export interface IBugData {
  category: 'Tecnico' | 'Visivo' | 'Altro';
  description: string;
  context: string;
}

export interface IReport {
  id: string;
  user: IUser['id'];
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
  classID: IUser['classID'];
  date: string;
  bug?: IBugData;
}

export interface IReportModel extends Document {
  id: string;
}
