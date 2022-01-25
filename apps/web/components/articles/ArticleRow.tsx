import { Switch } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { Article } from '@prisma/client';
import ButtonLink from 'components/links/ButtonLink';
import { useEffect, useRef, useState } from 'react';

interface ArticleRowProps {
	article: Omit<Article, 'updated_at' | 'created_at'>;
	onPublish: (published: boolean, id: string) => void;
}

export default function ArticleRow({ article, onPublish }: ArticleRowProps) {
	const [published, setPublished] = useState(article.published);
	const [debounced] = useDebouncedValue(published, 400);

	const isFirstRun = useRef(true);

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
		} else {
			onPublish(debounced, article.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debounced]);

	return (
		<tr key={article.id}>
			<td>{article.title}</td>
			<td>{article.author}</td>
			<td>{article.readingTime} minuti</td>
			<td>
				<Switch
					checked={published}
					onChange={(e) => setPublished(e.currentTarget.checked)}
				/>
			</td>
			<td>
				<ButtonLink href={`/dashboard/articles/${article.id}`}>
					Modifica
				</ButtonLink>
			</td>
		</tr>
	);
}
