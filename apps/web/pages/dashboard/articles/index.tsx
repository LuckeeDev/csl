import { ScrollArea, Table } from '@mantine/core';
import ArticleRow from 'components/articles/ArticleRow';
import PageTitle from 'components/head/PageTitle';
import { IconCheck, IconX } from '@tabler/icons';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import useSWR from 'swr';
import { getArticles, setPublished } from 'data/api/articles';
import { useMemo } from 'react';
import PageHeading from 'components/heading/PageHeading';
import useDataError from 'hooks/errors/useDataError';
import { showNotification } from '@mantine/notifications';

function DashboardArticlesIndex() {
	const { data, mutate, error } = useSWR('/api/articles', getArticles);
	useDataError(error);

	const articles = useMemo(() => data?.articles ?? [], [data]);

	async function handlePublishChange(published: boolean, articleId: string) {
		const index = articles.findIndex((a) => a.id === articleId);
		const newArticles = [...articles];
		newArticles[index] = { ...newArticles[index], published };

		mutate(setPublished({ id: articleId, published }), {
			optimisticData: {
				articles: newArticles,
			},
			revalidate: false,
		});

		if (published) {
			showNotification({
				title: 'Articolo pubblicato',
				message: "L'articolo è ora visibile nella pagina degli articoli!",
				icon: <IconCheck />,
				color: 'teal',
			});
		} else {
			showNotification({
				title: 'Articolo rimosso',
				message: "L'articolo non è più visibile sulla pagina degli articoli",
				icon: <IconX />,
				color: 'orange',
			});
		}
	}

	const rows = articles.map((element) => (
		<ArticleRow
			key={element.id}
			article={element}
			onPublish={handlePublishChange}
		/>
	));

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Articoli</PageTitle>

			<PageHeading loading={!data?.articles}>Articoli</PageHeading>

			<ScrollArea>
				<Table sx={{ minWidth: 800 }}>
					<thead>
						<tr>
							<th>Titolo</th>
							<th>Autore</th>
							<th>Tempo di lettura</th>
							<th>Pubblicato</th>
							<th>Azioni</th>
						</tr>
					</thead>

					<tbody>{rows}</tbody>
				</Table>
			</ScrollArea>
		</DashboardPageContainer>
	);
}

DashboardArticlesIndex.hasSidebar = true;
DashboardArticlesIndex.sidebarLinks = ARTICLE_LINKS;
DashboardArticlesIndex.hasLocalCache = true;

export default DashboardArticlesIndex;
