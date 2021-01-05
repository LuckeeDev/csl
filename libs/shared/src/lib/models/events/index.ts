import { Document } from 'mongoose';

export interface IEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  cover: string;
  signup: string;
}

export interface IEventModel extends IEvent, Document {
  id: string;
}
