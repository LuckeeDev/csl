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
	{
		icon: 'list',
		color: 'indigo',
		label: 'Seminari',
		href: '/dashboard/events/seminars',
		requiredPermissions: [],
	},
	{
		icon: 'write',
		color: 'indigo',
		label: 'Nuovo seminario',
		href: '/dashboard/events/seminars/new',
		requiredPermissions: [],
	},
	{
		icon: 'profile',
		color: 'indigo',
		label: 'Account di servizio',
		href: '/dashboard/events/service-account',
		requiredPermissions: [],
	},
];
