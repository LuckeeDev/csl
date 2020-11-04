import { Document } from 'mongoose';

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

interface IContent {
  blocks: IBlock[];
  time: number;
  version: string;
}

export interface IArticle {
  content: IContent;
  title: string;
  id: string;
  author: string;
  category: string;
  estimatedTime: number;
  image: string;
  date: string;
  preview?: string;
}

export interface IArticleModel extends Document, IArticle {
  id: string;
}
