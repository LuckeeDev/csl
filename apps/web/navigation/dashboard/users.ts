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
		icon: 'users',
		color: 'grape',
		label: 'Utenti',
		href: '/dashboard/users',
		requiredPermissions: [],
	},
	{
		icon: 'lock-access',
		color: 'grape',
		label: 'Ruoli',
		href: '/dashboard/users/roles',
		requiredPermissions: [],
	},
];
