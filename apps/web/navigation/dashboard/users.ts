import { LinkData } from 'navigation/types';

export const USERS_LINKS: LinkData[] = [
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
		label: 'Elenco gruppi',
		href: '/dashboard/users',
		requiredPermissions: [],
	},
];
