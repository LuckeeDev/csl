import { WrapperLinkProps } from 'components/wrapper/types';

export const EVENT_LINKS: WrapperLinkProps['sublinks'] = [
	{
		label: 'Eventi',
		href: '/dashboard/events',
	},
	{
		label: 'Fasce orarie',
		href: '/dashboard/events/slots',
	},
	{
		label: 'Nuova fascia oraria',
		href: '/dashboard/events/slots/new',
	},
	{
		label: 'Seminari',
		href: '/dashboard/events/seminars',
	},
	{
		label: 'Nuovo seminario',
		href: '/dashboard/events/seminars/new',
	},
	{
		label: 'Account di servizio',
		href: '/dashboard/events/service-account',
	},
];
