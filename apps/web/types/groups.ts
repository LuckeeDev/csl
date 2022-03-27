import { Group } from '@prisma/client';

export type ExtendedGroup = Group & {
	_count: { users: number; managers: number };
};

export enum UnlinkUser {
	MANAGERS = 'MANAGERS',
	USERS = 'USERS',
}
