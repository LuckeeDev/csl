import { Article } from '@prisma/client';
import axios from 'axios';

export async function getArticles(url: string) {
	return (await axios.get<{ articles: Article[] }>(url)).data;
}
