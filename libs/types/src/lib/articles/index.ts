export interface StrapiArticle {
	title: string;
	content: string;
	author: string;
	published_at: string;
	category: StrapiArticleCategory;
}

export interface StrapiArticleCategory {
	name: string;
	color: string;
}
