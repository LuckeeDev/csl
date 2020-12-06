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

interface IPage {
  blocks: IBlock[];
  time: number;
  version: string;
}

export interface ICommissione {
  id:
    | 'arte'
    | 'biblioteca'
    | 'cinema'
    | 'dibattito'
    | 'green'
    | 'feste'
    | 'lir'
    | 'musica'
    | 'omnia'
    | 'sport'
    | 'tutoring'
    | 'vale'
    | 'comitato'
    | 'asl'
    | 'consulta'
    | 'portarti';
  page: IPage;
  title: string;
  image: string;
  files: string[];
}

export interface ICommissioneModel extends Document, ICommissione {
  id:
    | 'arte'
    | 'biblioteca'
    | 'cinema'
    | 'dibattito'
    | 'green'
    | 'feste'
    | 'lir'
    | 'musica'
    | 'omnia'
    | 'sport'
    | 'tutoring'
    | 'vale'
    | 'comitato'
    | 'asl'
    | 'consulta'
    | 'portarti';
}
