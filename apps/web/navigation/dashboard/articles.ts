import { WrapperLinkProps } from 'components/wrapper/types';

export const ARTICLE_LINKS: WrapperLinkProps['sublinks'] = [
	{
		label: 'Articoli',
		href: '/dashboard/articles',
	},
	{
		label: 'Nuovo articolo',
		href: '/dashboard/articles/new',
	},
	{
		label: 'Categorie',
		href: '/dashboard/articles/categories',
	},
];
