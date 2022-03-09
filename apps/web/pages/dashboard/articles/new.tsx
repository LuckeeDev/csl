import { LoadingOverlay } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import axios from 'axios';
import { environment } from 'environments/environment';
import { CheckIcon } from '@modulz/radix-icons';
import PageTitle from 'components/head/PageTitle';
import ArticleForm from 'components/forms/ArticleForm';
import useArticleForm, { ArticleFormValues } from 'hooks/useArticleForm';
import { useRouter } from 'next/router';
import { Article } from '@prisma/client';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import { useBooleanToggle } from '@mantine/hooks';

function DashboardArticlesNew() {
	const form = useArticleForm();
	const [overlay, toggleOverlay] = useBooleanToggle(false);
	const notifications = useNotifications();
	const router = useRouter();

	async function onSubmit(val: ArticleFormValues) {
		toggleOverlay();

		const {
			data: { id },
		} = await axios.post<Article>(
			// /new is needed because of how Next API routing works
			`${environment.url}/api/articles/new`,
			{ article: val },
			{ withCredentials: true }
		);

		notifications.showNotification({
			title: 'Articolo salvato',
			message: 'Torna alla pagina degli articoli per pubblicarlo!',
			icon: <CheckIcon />,
			color: 'teal',
		});

		toggleOverlay();

		router.push(`/dashboard/articles/${id}`);
	}

	return (
		<div>
			<PageTitle>Dashboard | Nuovo articolo</PageTitle>

			<LoadingOverlay visible={overlay} />

			<h1>Nuovo articolo</h1>

			<ArticleForm form={form} onSubmit={onSubmit} />
		</div>
	);
}

DashboardArticlesNew.hasSidebar = true;
DashboardArticlesNew.sidebarLinks = ARTICLE_LINKS;

export default DashboardArticlesNew;
