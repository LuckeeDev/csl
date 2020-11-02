export interface PaymentIntentResponse {
  success: boolean;
  clientSecret?: string;
  classID?: string;
  isConfirmed?: boolean;
  total?: number;
  isPaid?: boolean;
}
