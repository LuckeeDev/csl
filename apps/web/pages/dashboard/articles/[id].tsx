import { useNotifications } from '@mantine/notifications';
import { Article } from '@prisma/client';
import ArticleForm from 'components/forms/ArticleForm';
import PageTitle from 'components/head/PageTitle';
import BackHeading from 'components/heading/BackHeading';
import { CheckIcon } from '@modulz/radix-icons';
import axios from 'axios';
import { environment } from 'environments/environment';
import useArticleForm, { ArticleFormValues } from 'hooks/forms/useArticleForm';
import { useRouter } from 'next/router';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import useSWR from 'swr';
import { getArticle } from 'data/api/articles';

function DashboardArticlesEdit() {
	const router = useRouter();
	const { data: article } = useSWR(
		`/api/articles/${router.query.id}`,
		getArticle
	);
	const form = useArticleForm(article);
	const notifications = useNotifications();

	async function onSubmit(val: ArticleFormValues) {
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
