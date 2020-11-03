export interface IHttpRes<T> {
  success: boolean;
  data?: T;
  err?: string;
}
