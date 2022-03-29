import {
	Button,
	ColorInput,
	InputWrapper,
	ScrollArea,
	Table,
	TextInput,
} from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import ArticleCategoryRow from 'components/tableRows/ArticleCategoryRow';
import {
	createArticleCategory,
	deleteArticleCategory,
	getArticleCategories,
} from 'data/api/articleCategories';
import useDataError from 'hooks/errors/useDataError';
import Joi from 'joi';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import { useMemo } from 'react';
import useSWR from 'swr';

export interface NewCategoryFormValues {
	name: string;
	color: string;
}

const newCategoryFormSchema = Joi.object({
	name: Joi.string().required(),
	color: Joi.string()
		.regex(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)
		.required(),
});

function DashboardArticlesCategories() {
	const { data, mutate, error } = useSWR(
		'/api/article-categories',
		getArticleCategories
	);
	const notifications = useDataError(error);
	const form = useForm<NewCategoryFormValues>({
		initialValues: {
			name: '',
			color: '',
		},
		schema: joiResolver(newCategoryFormSchema),
	});

	function handleSubmit(val: NewCategoryFormValues) {
		mutate(createArticleCategory(val), {
			optimisticData: [
				...(data ?? []),
				{
					...val,
					_count: { articles: 0 },
					id: 'new',
					updated_at: new Date(),
					created_at: new Date(),
				},
			],
			revalidate: false,
		});

		notifications.showNotification({
			color: 'teal',
			title: 'Categoria creata',
			message: "L'operazione è stata completata con successo",
			icon: <CheckIcon />,
		});
	}

	function handleDelete(id: string) {
		const optimisticData = [...(data ?? [])];

		const index = optimisticData.findIndex((c) => c.id === id);

		optimisticData.splice(index, 1);

		mutate(deleteArticleCategory(id, data ?? []), {
			optimisticData,
			revalidate: false,
		});

		notifications.showNotification({
			color: 'orange',
			icon: <Cross1Icon />,
			title: 'Categoria eliminata',
			message: 'La categoria e gli articoli connessi sono stati eliminati',
		});
	}

	const rows = useMemo(
		() =>
			data?.map((c, index) => (
				<ArticleCategoryRow
					onDelete={handleDelete}
					key={index}
					articleCategory={c}
				/>
			)) ?? [],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[data]
	);

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Categorie</PageTitle>

			<PageHeading>Categorie</PageHeading>

			<ScrollArea>
				<Table style={{ minWidth: '800px' }}>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Colore</th>
							<th>Articoli</th>
							<th>Azioni</th>
						</tr>
					</thead>

					<tbody>
						{rows}
						<tr>
							<td>
								<InputWrapper label="Nuova categoria" required>
									<TextInput
										form="article-category-form"
										placeholder="Inserisci il nome della nuova categoria..."
										{...form.getInputProps('name')}
									/>
								</InputWrapper>
							</td>

							<td>
								<InputWrapper label="Colore" required>
									<ColorInput
										form="article-category-form"
										placeholder="Scegli un colore per la nuova categoria..."
										{...form.getInputProps('color')}
									/>
								</InputWrapper>
							</td>

							<td></td>

							<td>
								<Button type="submit" form="article-category-form">
									Crea
								</Button>
							</td>
						</tr>
					</tbody>
				</Table>
			</ScrollArea>

			<form
				id="article-category-form"
				onSubmit={form.onSubmit(handleSubmit)}
			></form>
		</DashboardPageContainer>
	);
}

DashboardArticlesCategories.hasSidebar = true;
DashboardArticlesCategories.sidebarLinks = ARTICLE_LINKS;
DashboardArticlesCategories.hasLocalCache = true;

export default DashboardArticlesCategories;
