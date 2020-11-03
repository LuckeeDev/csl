export interface IPaymentIntentData {
  clientSecret: string;
  classID: string;
  isConfirmed: boolean;
  total: number;
  isPaid: boolean;
}
