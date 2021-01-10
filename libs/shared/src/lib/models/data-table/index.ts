export interface CSLDataTableAction<T = string> {
  type: 'basic' | 'primary' | 'accent' | 'warn';
  label: string;
  id: T;
}

export type CSLDataTableSource<T = any> = {
  id: string;
  data: T;
  actions?: CSLDataTableAction[];
}[];

export type CSLDataTableDisplayedColumns = {
  label: string;
  id: string;
  type: 'data' | 'actions';
}[]

export interface CSLDataTableEvent<T = string> {
  id: string;
  action: T;
}
