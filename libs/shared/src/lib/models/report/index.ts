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
  date: Date;
  solved: boolean;
  bug?: IBugData;
}

export interface IReportModel extends Document, IReport {
  id: string;
}
