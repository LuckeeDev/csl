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
		icon: 'list',
		color: 'violet',
		label: 'Ordini',
		href: '/dashboard/orders',
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
	{
		icon: 'rocket',
		color: 'yellow',
		label: 'Negozio',
		href: '/dashboard/shop',
		hasSublinks: true,
		requiredPermissions: [Permission.SHOP_MANAGER],
	},
	{
		icon: 'calendar',
		color: 'indigo',
		label: 'Eventi',
		href: '/dashboard/events',
		hasSublinks: true,
		requiredPermissions: [Permission.EVENTS_MANAGER],
	},
	{
		icon: 'profile',
		color: 'grape',
		label: 'Utenti',
		href: '/dashboard/users',
		hasSublinks: true,
		requiredPermissions: [Permission.USERS_MANAGER],
	},
];
