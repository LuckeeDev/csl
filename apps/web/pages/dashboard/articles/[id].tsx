import { LoadingOverlay } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { Article } from '@prisma/client';
import ArticleForm from 'components/forms/ArticleForm';
import PageTitle from 'components/head/PageTitle';
import BackHeading from 'components/heading/BackHeading';
import { WrapperLinkProps } from 'components/wrapper/types';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';
import { useState } from 'react';
import { CheckIcon } from '@modulz/radix-icons';
import axios from 'axios';
import { environment } from 'environments/environment';
import useArticleForm, {
	ArticleData,
	ArticleFormValues,
} from 'hooks/useArticleForm';
import { useRouter } from 'next/router';

interface DashboardArticlesEditProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
	article: ArticleData;
}

export default function DashboardArticlesEdit({
	article,
}: DashboardArticlesEditProps) {
	const form = useArticleForm(article);
	const [overlay, setOverlay] = useState(false);
	const notifications = useNotifications();
	const router = useRouter();

	function toggleOverlay() {
		setOverlay((val) => !val);
	}

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
		<div>
			<PageTitle>Dashboard | Modifica articolo</PageTitle>

			<LoadingOverlay visible={overlay} />

			<BackHeading>Modifica articolo</BackHeading>

			<ArticleForm form={form} onSubmit={onSubmit} />
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
				published: true,
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
						label: 'Articoli',
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
