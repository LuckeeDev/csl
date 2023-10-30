import { ScrollArea, Table } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import ArticleRow from 'components/articles/ArticleRow';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import { getArticles, setPublished } from 'data/api/articles';
import useDataError from 'hooks/errors/useDataError';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import { useMemo } from 'react';
import useSWR from 'swr';

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
				<Table style={{ minWidth: 800 }}>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Titolo</Table.Th>
							<Table.Th>Autore</Table.Th>
							<Table.Th>Tempo di lettura</Table.Th>
							<Table.Th>Pubblicato</Table.Th>
							<Table.Th>Azioni</Table.Th>
						</Table.Tr>
					</Table.Thead>

					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea>
		</DashboardPageContainer>
	);
}

DashboardArticlesIndex.hasSidebar = true;
DashboardArticlesIndex.sidebarLinks = ARTICLE_LINKS;
DashboardArticlesIndex.hasLocalCache = true;

export default DashboardArticlesIndex;
