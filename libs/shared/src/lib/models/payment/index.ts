import { IUser } from '../user';

export interface PaymentSessionData {
	ready: boolean;

	/**
	 * Session ID to redirect to checkout.
	 */
	id: string;

	/**
	 * Total amount of the purchase (expressed in cents).
	 */
	total: number;
}

export interface PaymentSessionData {
	ready: boolean;
	notConfirmed: IUser[];
}
