import { Permission } from '@prisma/client';
import {
	IconApps,
	IconCalendar,
	IconPencil,
	IconRocket,
	IconShoppingCart,
	IconUser,
	IconUsers,
} from '@tabler/icons-react';
import { WrapperLinkProps } from 'components/wrapper/types';

import { ARTICLE_LINKS } from './articles';
import { EVENT_LINKS } from './events';
import { GROUPS_LINKS } from './groups';
import { SHOP_LINKS } from './shop';
import { USERS_LINKS } from './users';

export const DASHBOARD_LINKS: WrapperLinkProps[] = [
	{
		icon: IconUser,
		label: 'Profilo',
		href: '/dashboard',
		requiredPermissions: [],
	},
	{
		icon: IconShoppingCart,
		label: 'Ordini',
		href: '/dashboard/orders',
		requiredPermissions: [],
	},
	{
		icon: IconPencil,
		label: 'Articoli',
		href: null,
		sublinks: ARTICLE_LINKS,
		requiredPermissions: [Permission.NEWS_EDITOR],
	},
	{
		icon: IconRocket,
		label: 'Negozio',
		href: null,
		sublinks: SHOP_LINKS,
		requiredPermissions: [Permission.SHOP_MANAGER],
	},
	{
		icon: IconCalendar,
		label: 'Eventi',
		href: null,
		sublinks: EVENT_LINKS,
		requiredPermissions: [Permission.EVENTS_MANAGER],
	},
	{
		icon: IconApps,
		label: 'Gruppi',
		href: null,
		sublinks: GROUPS_LINKS,
		requiredPermissions: [],
	},
	{
		icon: IconUsers,
		label: 'Utenti e ruoli',
		href: null,
		sublinks: USERS_LINKS,
		requiredPermissions: [Permission.USERS_MANAGER],
	},
];
