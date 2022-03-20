import { Group } from '@prisma/client';

export type ExtendedGroup = Group & {
	_count: { users: number; managers: number };
};
