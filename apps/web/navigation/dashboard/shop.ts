import { LinkData } from 'navigation/types';

export const SHOP_LINKS: LinkData[] = [
	{
		icon: 'back',
		color: 'transparent',
		label: 'Torna indietro',
		href: '/dashboard',
		requiredPermissions: [],
	},
	{
		icon: 'list',
		color: 'yellow',
		label: 'Sessioni di vendita',
		href: '/dashboard/shop',
		requiredPermissions: [],
	},
	{
		icon: 'write',
		color: 'yellow',
		label: 'Nuova sessione',
		href: '/dashboard/shop/new',
		requiredPermissions: [],
	},
	{
		icon: 'list',
		color: 'yellow',
		label: 'Categorie',
		href: '/dashboard/shop/categories',
		requiredPermissions: [],
	},
	{
		icon: 'list',
		color: 'yellow',
		label: 'Prodotti',
		href: '/dashboard/shop/products',
		requiredPermissions: [],
	},
	{
		icon: 'write',
		color: 'yellow',
		label: 'Nuovo prodotto',
		href: '/dashboard/shop/products/new',
		requiredPermissions: [],
	},
	{
		icon: 'list',
		color: 'yellow',
		label: 'Sconti',
		href: '/dashboard/shop/discounts',
		requiredPermissions: [],
	},
];
