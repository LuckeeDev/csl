import { showNotification } from '@mantine/notifications';
import { Link } from '@mantine/tiptap';
import { IconCheck } from '@tabler/icons-react';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import ArticleForm from 'components/forms/ArticleForm';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import { getArticle, updateArticle } from 'data/api/articles';
import useDataError from 'hooks/errors/useDataError';
import useArticleForm, { ArticleFormValues } from 'hooks/forms/useArticleForm';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import useSWR from 'swr';

function DashboardArticlesEdit() {
	const router = useRouter();
	const articleId = useMemo(() => router.query.id as string, [router.query]);
	const {
		data: article,
		error,
		mutate,
	} = useSWR(
		router.query.id ? `/api/articles/${router.query.id}` : false,
		getArticle
	);

	const articleFormData = useMemo(
		() =>
			article && {
				title: article.title,
				content: article.content,
				author: article.author,
				readingTime: article.readingTime,
				imageId: article.imageId,
			},
		[article]
	);
	const form = useArticleForm(articleFormData);

	const editor = useEditor({
		extensions: [StarterKit, Underline, Link, Superscript, Subscript],
		content: articleFormData?.content,
	});
	useDataError(error);

	async function onSubmit(val: ArticleFormValues & { content: string }) {
		mutate(updateArticle({ ...val, id: articleId }), {
			revalidate: false,
		});

		showNotification({
			title: 'Articolo salvato',
			message: 'Torna alla pagina degli articoli per pubblicarlo!',
			icon: <IconCheck />,
			color: 'teal',
		});
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Modifica articolo</PageTitle>

			<PageHeading back>Modifica articolo</PageHeading>

			{article && editor && (
				<ArticleForm editor={editor} form={form} onSubmit={onSubmit} />
			)}
		</DashboardPageContainer>
	);
}

DashboardArticlesEdit.hasSidebar = true;
DashboardArticlesEdit.sidebarLinks = ARTICLE_LINKS;
DashboardArticlesEdit.hasLocalCache = true;

export default DashboardArticlesEdit;
