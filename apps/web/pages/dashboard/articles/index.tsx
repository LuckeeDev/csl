import { Table } from '@mantine/core';
import { Article } from '@prisma/client';
import PageTitle from 'components/head/PageTitle';
import ButtonLink from 'components/links/ButtonLink';
import { WrapperLinkProps } from 'components/wrapper/types';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';

interface DashboardArticlesIndexProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
	articles: Partial<Article>[];
}

export default function DashboardArticlesIndex({
	articles,
}: DashboardArticlesIndexProps) {
	const rows = articles.map((element) => (
		<tr key={element.id}>
			<td>{element.title}</td>
			<td>{element.author}</td>
			<td>{element.readingTime} minuti</td>
			<td>
				<ButtonLink href={`/dashboard/articles/${element.id}`}>Modifica</ButtonLink>
			</td>
		</tr>
	));

	return (
		<div>
			<PageTitle>Dashboard | Articoli pubblicati</PageTitle>

			<h1>Articoli pubblicati</h1>

			<Table>
				<thead>
					<tr>
						<th>Titolo</th>
						<th>Autore</th>
						<th>Tempo di lettura</th>
						<th>Azioni</th>
					</tr>
				</thead>

				<tbody>{rows}</tbody>
			</Table>
		</div>
	);
}

const getServerSideProps: GetServerSideProps<DashboardArticlesIndexProps> =
	async () => {
		const articles = await prisma.article.findMany({
			select: {
				author: true,
				content: true,
				readingTime: true,
				title: true,
				id: true,
			},
		});

		return {
			props: {
				hasSidebar: true,
				sidebarLinks: [
					{
						icon: 'back',
						color: 'transparent',
						label: 'Torna indietro',
						href: '/dashboard',
					},
					{
						icon: 'list',
						color: 'teal',
						label: 'Articoli pubblicati',
						href: '/dashboard/articles',
					},
					{
						icon: 'write',
						color: 'teal',
						label: 'Nuovo articolo',
						href: '/dashboard/articles/new',
					},
				],
				articles,
			},
		};
	};

export { getServerSideProps };
