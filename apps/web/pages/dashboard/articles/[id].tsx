import { useNotifications } from '@mantine/notifications';
import ArticleForm from 'components/forms/ArticleForm';
import PageTitle from 'components/head/PageTitle';
import BackHeading from 'components/heading/BackHeading';
import { CheckIcon } from '@modulz/radix-icons';
import useArticleForm, { ArticleFormValues } from 'hooks/forms/useArticleForm';
import { useRouter } from 'next/router';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import useSWR from 'swr';
import { getArticle, updateArticle } from 'data/api/articles';
import useDataError from 'hooks/errors/useDataError';
import { useMemo } from 'react';

function DashboardArticlesEdit() {
	const router = useRouter();
	const articleId = useMemo(() => router.query.id as string, [router.query]);
	const {
		data: article,
		error,
		mutate,
	} = useSWR(`/api/articles/${router.query.id}`, getArticle);

	const articleFormData = useMemo(
		() =>
			article && {
				title: article.title,
				content: article.content,
				author: article.author,
				readingTime: article.readingTime,
			},
		[article]
	);
	const form = useArticleForm(articleFormData);
	const notifications = useNotifications();

	useDataError(error);

	async function onSubmit(val: ArticleFormValues) {
		mutate(updateArticle({ ...val, id: articleId }), {
			revalidate: false,
		});

		notifications.showNotification({
			title: 'Articolo salvato',
			message: 'Torna alla pagina degli articoli per pubblicarlo!',
			icon: <CheckIcon />,
			color: 'teal',
		});
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Modifica articolo</PageTitle>

			<BackHeading>Modifica articolo</BackHeading>

			{article && <ArticleForm form={form} onSubmit={onSubmit} />}
		</DashboardPageContainer>
	);
}

DashboardArticlesEdit.hasSidebar = true;
DashboardArticlesEdit.sidebarLinks = ARTICLE_LINKS;
DashboardArticlesEdit.hasLocalCache = true;

export default DashboardArticlesEdit;
