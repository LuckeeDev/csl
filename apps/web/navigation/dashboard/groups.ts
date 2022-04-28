import { Permission } from '@prisma/client';
import { LinkData } from 'navigation/types';

export const GROUPS_LINKS: LinkData[] = [
	{
		icon: 'back',
		color: 'transparent',
		label: 'Torna indietro',
		href: '/dashboard',
		requiredPermissions: [],
	},
	{
		icon: 'list',
		color: 'grape',
		label: 'I miei gruppi',
		href: '/dashboard/groups',
		requiredPermissions: [],
	},
	{
		icon: 'list',
		color: 'grape',
		label: 'Tutti i gruppi',
		href: '/dashboard/groups/all',
		requiredPermissions: [Permission.USERS_MANAGER],
	},
];
