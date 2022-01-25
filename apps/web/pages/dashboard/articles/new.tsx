import { WrapperLinkProps } from 'components/wrapper/types';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
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

interface DashboardArticlesNewProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

export default function DashboardArticlesNew() {
	const form = useArticleForm();
	const [overlay, setOverlay] = useState(false);
	const notifications = useNotifications();
	const router = useRouter();

	function toggleOverlay() {
		setOverlay((val) => !val);
	}

	async function onSubmit(val: ArticleFormValues) {
		toggleOverlay();

		const { id }: Article = await axios.post(
			`${environment.url}/api/articles`,
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

const getServerSideProps: GetServerSideProps<DashboardArticlesNewProps> =
	async () => {
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
			},
		};
	};

export { getServerSideProps };
