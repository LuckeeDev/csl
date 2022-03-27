import { ArticleCategory } from '@prisma/client';
import axios from 'axios';
import { environment } from 'environments/environment';
import { NewCategoryFormValues } from 'pages/dashboard/articles/categories';

export async function getArticleCategories(url: string) {
	return (
		await axios.get<(ArticleCategory & { _count: { articles: number } })[]>(url)
	).data;
}

export function createArticleCategory(data: NewCategoryFormValues) {
	return async (
		currentData:
			| (ArticleCategory & { _count: { articles: number } })[]
			| undefined
	) => {
		const { data: newCategory } = await axios.post<
			ArticleCategory & { _count: { articles: number } }
		>(`${environment.url}/api/article-categories`, data);

		if (!currentData) {
			return [newCategory];
		}

		const index = currentData?.findIndex(
			(c) =>
				newCategory.color === c.color &&
				newCategory.name === c.name &&
				c.id === 'new'
		);

		currentData[index] = newCategory;

		return currentData;
	};
}

export function deleteArticleCategory(
	id: string,
	currentData: (ArticleCategory & { _count: { articles: number } })[]
) {
	return async () => {
		await axios.delete(`${environment.url}/api/article-categories/${id}`);

		const index = currentData.findIndex((c) => c.id === id);

		currentData.splice(index, 1);

		return currentData;
	};
}
