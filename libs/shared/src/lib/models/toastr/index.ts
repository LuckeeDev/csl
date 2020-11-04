export interface IToastrData {
  message: string;
  color: 'basic' | 'primary' | 'success' | 'accent' | 'warn';
  action?: string;
  duration?: number;
}
