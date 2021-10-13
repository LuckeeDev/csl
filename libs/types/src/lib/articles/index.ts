import { StrapiImage } from '../images';

export interface StrapiArticle {
	id: string;
	title: string;
	content: string;
	author: string;
	published_at: string;
	category: StrapiArticleCategory;
	cover: StrapiImage;
	reading_time: number;
	snippet: string;
}

export interface StrapiArticleCategory {
	name: string;
	color: string;
}
