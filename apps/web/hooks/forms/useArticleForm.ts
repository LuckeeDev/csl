import { useForm } from '@mantine/form';
import { Article } from '@prisma/client';
import { useEffect, useRef } from 'react';

export interface ArticleFormValues {
	title: string;
	author: string;
	readingTime: number | '';
	imageId: string;
}

const DEFAULT_VALUES: ArticleFormValues = {
	title: '',
	author: '',
	readingTime: '',
	imageId: '',
};

export type ArticleData = Omit<
	Article,
	'categoryId' | 'published' | 'updated_at' | 'created_at' | 'id' | 'content'
>;

export default function useArticleForm(article?: ArticleData) {
	// Keep track if the hook is being called for the first time
	const isFirstLaunch = useRef(true);

	const form = useForm<ArticleFormValues>({
		initialValues: article ? article : DEFAULT_VALUES,

		validate: {
			title: (val) => (val ? null : 'Questo campo è necessario'),
			author: (val) => (val ? null : 'Questo campo è necessario'),
			readingTime: (val) => (val ? null : 'Questo campo è necessario'),
			imageId: (val) => (val ? null : 'Questo campo è necessario'),
		},
	});

	// Update the ref to know that the next render is not the first one
	useEffect(() => {
		if (isFirstLaunch.current) {
			isFirstLaunch.current = false;
		}
	}, []);

	// Update the form values if article data changes
	useEffect(() => {
		if (article) {
			form.setValues(article);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [article]);

	return form;
}
