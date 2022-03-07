import { LinkData } from 'navigation/types';

export const ARTICLE_LINKS: LinkData[] = [
	{
		icon: 'back',
		color: 'transparent',
		label: 'Torna indietro',
		href: '/dashboard',
		requiredPermissions: [],
	},
	{
		icon: 'list',
		color: 'teal',
		label: 'Articoli',
		href: '/dashboard/articles',
		requiredPermissions: [],
	},
	{
		icon: 'write',
		color: 'teal',
		label: 'Nuovo articolo',
		href: '/dashboard/articles/new',
		requiredPermissions: [],
	},
];
