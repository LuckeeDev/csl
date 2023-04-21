import { WrapperLinkProps } from 'components/wrapper/types';

export const USERS_LINKS: WrapperLinkProps['sublinks'] = [
	{
		label: 'Utenti',
		href: '/dashboard/users',
	},
	{
		label: 'Tutti i gruppi',
		href: '/dashboard/groups/all',
	},
	{
		label: 'Ruoli',
		href: '/dashboard/users/roles',
	},
];
