import { LinkData } from 'navigation/types';

export const EVENT_LINKS: LinkData[] = [
	{
		icon: 'back',
		color: 'transparent',
		label: 'Torna indietro',
		href: '/dashboard',
		requiredPermissions: [],
	},
	{
		icon: 'list',
		color: 'indigo',
		label: 'Eventi',
		href: '/dashboard/events',
		requiredPermissions: [],
	},
	{
		icon: 'list',
		color: 'indigo',
		label: 'Fasce orarie',
		href: '/dashboard/events/slots',
		requiredPermissions: [],
	},
	{
		icon: 'write',
		color: 'indigo',
		label: 'Nuova fascia oraria',
		href: '/dashboard/events/slots/new',
		requiredPermissions: [],
	},
];