import { Document } from 'mongoose';

interface Status<T> {
	start: T;
	end: T;
}

/**
 * @param `T` used to tell the compiler if the start and end times should
 * be a Date or a number.
 */
export interface PlatformStatus<T extends number | Date = Date> {
	id: string;
	status: Status<T>;
}

export interface PlatformStatusModel extends Document, PlatformStatus {
	id: string;
}
