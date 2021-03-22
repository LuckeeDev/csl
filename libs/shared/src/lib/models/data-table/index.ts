export interface CSLDataTableAction<T = string> {
  type: 'basic' | 'primary' | 'accent' | 'warn';
  label: string;
  id: T;
  disabled?: boolean;
}

export type CSLDataTableSource<T = any> = {
  id: string;
  data: T;
  actions?: CSLDataTableAction[];
}[];

export type CSLDataTableDisplayedColumns<T = string> = {
  label: string;
  id: T | 'manage';
  type: 'data' | 'actions';
}[]

export interface CSLDataTableEvent<T = string> {
  id: string;
  action: T;
}
