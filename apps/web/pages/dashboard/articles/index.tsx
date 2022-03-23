import { ScrollArea, Table } from '@mantine/core';
import ArticleRow from 'components/articles/ArticleRow';
import PageTitle from 'components/head/PageTitle';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import { useNotifications } from '@mantine/notifications';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import useSWR from 'swr';
import { getArticles, updateArticle } from 'data/api/articles';
import { useEffect, useMemo } from 'react';
import LoaderHeading from 'components/heading/LoaderHeading';

function DashboardArticlesIndex() {
	const { data, mutate, error } = useSWR('/api/articles', getArticles);
	const notifications = useNotifications();
	const articles = useMemo(() => data?.articles ?? [], [data]);

	useEffect(() => {
		if (error) {
			notifications.showNotification({
				title: 'Errore',
				message: "C'è stato un errore nel caricamento dei dati",
				color: 'red',
				icon: <Cross1Icon />,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	async function handlePublishChange(published: boolean, articleId: string) {
		const index = articles.findIndex((a) => a.id === articleId);
		const newArticles = [...articles];
		newArticles[index] = { ...newArticles[index], published };

		mutate(updateArticle({ id: articleId, published }), {
			optimisticData: {
				articles: newArticles,
			},
			revalidate: false,
		});

		if (published) {
			notifications.showNotification({
				title: 'Articolo pubblicato',
				message: "L'articolo è ora visibile nella pagina degli articoli!",
				icon: <CheckIcon />,
				color: 'teal',
			});
		} else {
			notifications.showNotification({
				title: 'Articolo rimosso',
				message: "L'articolo non è più visibile sulla pagina degli articoli",
				icon: <Cross1Icon />,
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

			<LoaderHeading loading={!data?.articles}>Articoli</LoaderHeading>

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
