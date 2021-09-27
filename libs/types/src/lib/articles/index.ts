import { StrapiImage } from '@csl/types';

export interface StrapiArticle {
	title: string;
	content: string;
	author: string;
	published_at: string;
	category: StrapiArticleCategory;
	cover: StrapiImage;
}

export interface StrapiArticleCategory {
	name: string;
	color: string;
}
