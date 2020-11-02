import { Document } from 'mongoose';

interface IFile {
  url: string;
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

export interface IArticle extends Document {
  content: IContent;
  title: string;
  id: string;
  author: string;
  category: string;
  estimatedTime: number;
  image: string;
}
