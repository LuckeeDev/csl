import {
	Button,
	ColorInput,
	InputWrapper,
	Table,
	TextInput,
} from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import ArticleCategoryRow from 'components/tableRows/ArticleCategoryRow';
import { getArticleCategories } from 'data/api/articles';
import Joi from 'joi';
import { ARTICLE_LINKS } from 'navigation/dashboard/articles';
import { useMemo } from 'react';
import useSWR from 'swr';

interface NewCategoryFormValues {
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
	const { data } = useSWR('/api/article-categories', getArticleCategories);
	const form = useForm<NewCategoryFormValues>({
		initialValues: {
			name: '',
			color: '',
		},
		schema: joiResolver(newCategoryFormSchema),
	});

	function handleSubmit(val: NewCategoryFormValues) {
		console.log(val);
	}

	const rows = useMemo(
		() =>
			data?.map((c, index) => (
				<ArticleCategoryRow key={index} articleCategory={c} />
			)) ?? [],
		[data]
	);

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Categorie</PageTitle>

			<PageHeading>Categorie</PageHeading>

			<Table>
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
