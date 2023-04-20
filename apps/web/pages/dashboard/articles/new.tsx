import { LoadingOverlay } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { Link } from '@mantine/tiptap';
import { Article } from '@prisma/client';
import { IconCheck } from '@tabler/icons-react';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import ArticleForm from 'components/forms/ArticleForm';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import { environment } from 'environments/environment';
import useArticleForm, { ArticleFormValues } from 'hooks/forms/useArticleForm';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import { useRouter } from 'next/router';

function DashboardArticlesNew() {
	const form = useArticleForm();
	const [overlay, toggleOverlay] = useToggle();
	const router = useRouter();

	const editor = useEditor({
		extensions: [StarterKit, Underline, Link, Superscript, SubScript],
		content: '',
	});

	async function onSubmit(val: ArticleFormValues & { content: string }) {
		toggleOverlay();

		const {
			data: { id },
		} = await axios.post<Article>(
			`${environment.url}/api/articles`,
			{ article: val },
			{ withCredentials: true }
		);

		showNotification({
			title: 'Articolo salvato',
			message: 'Torna alla pagina degli articoli per pubblicarlo!',
			icon: <IconCheck />,
			color: 'teal',
		});

		toggleOverlay();

		router.push(`/dashboard/articles/${id}`);
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Nuovo articolo</PageTitle>

			<LoadingOverlay visible={overlay} />

			<PageHeading>Nuovo articolo</PageHeading>

			{editor && (
				<ArticleForm editor={editor} form={form} onSubmit={onSubmit} />
			)}
		</DashboardPageContainer>
	);
}

DashboardArticlesNew.hasSidebar = true;
DashboardArticlesNew.sidebarLinks = ARTICLE_LINKS;
DashboardArticlesNew.hasLocalCache = true;

export default DashboardArticlesNew;
