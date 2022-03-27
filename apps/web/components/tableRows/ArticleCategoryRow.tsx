import { Button } from '@mantine/core';
import { ArticleCategory } from '@prisma/client';
import ColorBlock from './ColorBlock';

interface ArticleCategoryRowProps {
	articleCategory: ArticleCategory & { _count: { articles: number } };
	onDelete: (id: string) => void;
}

export default function ArticleCategoryRow({
	articleCategory,
	onDelete,
}: ArticleCategoryRowProps) {
	return (
		<tr>
			<td>{articleCategory.name}</td>
			<td>
				<ColorBlock color={articleCategory.color} />
			</td>
			<td>{articleCategory._count.articles}</td>
			<td>
				<Button color="red" onClick={() => onDelete(articleCategory.id)}>
					Elimina
				</Button>
			</td>
		</tr>
	);
}
