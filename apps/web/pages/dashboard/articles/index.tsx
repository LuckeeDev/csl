import { ScrollArea, Table } from '@mantine/core';
import { Article } from '@prisma/client';
import axios from 'axios';
import ArticleRow from 'components/articles/ArticleRow';
import PageTitle from 'components/head/PageTitle';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import { useNotifications } from '@mantine/notifications';
import { environment } from 'environments/environment';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';

interface DashboardArticlesIndexProps {
	articles: Omit<Article, 'categoryId' | 'updated_at' | 'created_at'>[];
}

function DashboardArticlesIndex({ articles }: DashboardArticlesIndexProps) {
	const notifications = useNotifications();

	async function handlePublishChange(value: boolean, articleID: string) {
		const {
			data: { published },
		} = await axios.patch<Article>(
			`${environment.url}/api/articles/${articleID}`,
			{ article: { published: value } },
			{ withCredentials: true }
		);

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

			<h1>Articoli</h1>

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

export default DashboardArticlesIndex;

const getServerSideProps: GetServerSideProps<
	DashboardArticlesIndexProps
> = async () => {
	const articles = await prisma.article.findMany({
		select: {
			author: true,
			content: true,
			readingTime: true,
			title: true,
			id: true,
			published: true,
		},
		orderBy: {
			created_at: 'desc',
		},
	});

	return {
		props: {
			articles,
		},
	};
};

export { getServerSideProps };
