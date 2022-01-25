import { Article } from '@prisma/client';
import ArticleForm, { ArticleFormValues } from 'components/forms/ArticleForm';
import PageTitle from 'components/head/PageTitle';
import BackHeading from 'components/heading/BackHeading';
import { WrapperLinkProps } from 'components/wrapper/types';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';

interface DashboardArticlesEditProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
	article: Partial<Article>;
}

export default function DashboardArticlesEdit({
	article,
}: DashboardArticlesEditProps) {
	function onSubmit(val: ArticleFormValues) {
		console.log(val);
	}

	return (
		<div>
			<PageTitle>Dashboard | Modifica articolo</PageTitle>

			<BackHeading>Modifica articolo</BackHeading>

			<ArticleForm article={article} onSubmit={onSubmit} />
		</div>
	);
}

const getServerSideProps: GetServerSideProps<DashboardArticlesEditProps> =
	async (ctx) => {
		const articleID = ctx.params.id as string;

		const article = await prisma.article.findUnique({
			where: { id: articleID },
			select: {
				title: true,
				author: true,
				content: true,
				readingTime: true,
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
				article,
			},
		};
	};

export { getServerSideProps };
