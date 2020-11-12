import { Document } from 'mongoose';
import { IUser } from '../user';

interface IFile {
  url: string;
  firebasePath: string;
  firebaseURL?: string;
}

interface IData {
  level?: 1 | 2 | 3;
  text?: string;
  items?: string[];
  style?: 'ordered' | 'unordered';
  file?: IFile;
  stretched?: boolean;
  withBackground?: boolean;
  withBorder?: boolean;
  caption?: string;
}

interface IBlock {
  type: 'header' | 'paragraph' | 'list' | 'image';
  data: IData;
}

interface IPage {
  blocks: IBlock[];
  time: number;
  version: string;
}

export interface ICommissione {
  id: IUser['isReferente'];
  page: IPage;
  title: string;
  image: string;
}

export interface ICommissioneModel extends Document, ICommissione {
  id: IUser['isReferente'];
}
