import { LoadingOverlay } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { Article } from '@prisma/client';
import ArticleForm from 'components/forms/ArticleForm';
import PageTitle from 'components/head/PageTitle';
import BackHeading from 'components/heading/BackHeading';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import { CheckIcon } from '@modulz/radix-icons';
import axios from 'axios';
import { environment } from 'environments/environment';
import useArticleForm, {
	ArticleData,
	ArticleFormValues,
} from 'hooks/useArticleForm';
import { useRouter } from 'next/router';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import { getSession } from 'next-auth/react';
import { useBooleanToggle } from '@mantine/hooks';
import { BasePageProps } from 'types/pages';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';

interface DashboardArticlesEditProps extends BasePageProps {
	article: ArticleData;
}

function DashboardArticlesEdit({ article }: DashboardArticlesEditProps) {
	const form = useArticleForm(article);
	const [overlay, toggleOverlay] = useBooleanToggle(false);
	const notifications = useNotifications();
	const router = useRouter();

	async function onSubmit(val: ArticleFormValues) {
		toggleOverlay();

		const {
			data: { title, content, author, readingTime },
		} = await axios.patch<Article>(
			`${environment.url}/api/articles/${router.query.id}`,
			{ article: val },
			{ withCredentials: true }
		);

		form.setValues({
			title,
			content,
			author,
			readingTime,
		});

		notifications.showNotification({
			title: 'Articolo salvato',
			message: 'Torna alla pagina degli articoli per pubblicarlo!',
			icon: <CheckIcon />,
			color: 'teal',
		});

		toggleOverlay();
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Modifica articolo</PageTitle>

			<LoadingOverlay visible={overlay} />

			<BackHeading>Modifica articolo</BackHeading>

			<ArticleForm form={form} onSubmit={onSubmit} />
		</DashboardPageContainer>
	);
}

DashboardArticlesEdit.hasSidebar = true;
DashboardArticlesEdit.sidebarLinks = ARTICLE_LINKS;

export default DashboardArticlesEdit;

export const getServerSideProps: GetServerSideProps<
	DashboardArticlesEditProps
> = async (ctx) => {
	const session = await getSession(ctx);

	const articleID = ctx.params?.id as string;

	const article = await prisma.article.findUnique({
		where: { id: articleID },
		select: {
			title: true,
			author: true,
			content: true,
			readingTime: true,
			published: true,
		},
	});

	if (!article) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			session,
			article,
		},
	};
};
