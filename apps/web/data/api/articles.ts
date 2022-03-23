import { Article } from '@prisma/client';
import axios from 'axios';
import { ArticleFormValues } from 'hooks/forms/useArticleForm';

export async function getArticle(url: string) {
	return (await axios.get<Article>(url)).data;
}

export async function getArticles(url: string) {
	return (await axios.get<{ articles: Article[] }>(url)).data;
}

export function updateArticle({
	id,
	...articleData
}: Partial<Article> & { id: string }) {
	return async (currentData: { articles: Article[] } | undefined) => {
		const { data } = await axios.patch<Article>(`/api/articles/${id}`, {
			article: articleData,
		});

		const currentArticles = currentData?.articles ?? [];

		const index = currentArticles.findIndex((a) => a.id === data.id);

		currentArticles[index] = data;

		return { articles: currentArticles };
	};
}

export function updateSingleArticle({
	id,
	...articleData
}: ArticleFormValues & { id: string }) {
	return async () => {
		const { data } = await axios.patch<Article>(`/api/articles/${id}`, {
			article: articleData,
		});

		return data;
	};
}