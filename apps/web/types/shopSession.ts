import { ShopSession } from '@prisma/client';

export interface ShopSessionAPIData
	extends Omit<ShopSession, 'start' | 'end' | 'updated_at' | 'created_at'> {
	start: string;
	end: string;
}

export enum SessionStatus {
	PAST,
	ONGOING,
	UPCOMING,
}
