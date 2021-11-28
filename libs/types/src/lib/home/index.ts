import { StrapiArticle } from '../articles';
import { StrapiImage } from '../images';

interface StrapiHomeSection {
	title: string;
	description: string;
	image: StrapiImage;
}

export interface StrapiHome {
	title: string;
	description: string;
	image: StrapiImage;
	main_article: StrapiArticle;
	articles: StrapiArticle[];
	sections: StrapiHomeSection[];
}
