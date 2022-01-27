import { Permission } from '@prisma/client';
import { LinkData } from 'navigation/types';

export const DASHBOARD_LINKS: LinkData[] = [
	{
		icon: 'profile',
		color: 'blue',
		label: 'Profilo',
		href: '/dashboard',
		requiredPermissions: [],
	},
	{
		icon: 'write',
		color: 'teal',
		label: 'Articoli',
		href: '/dashboard/articles',
		hasSublinks: true,
		requiredPermissions: [Permission.NEWS_EDITOR],
	},
];
