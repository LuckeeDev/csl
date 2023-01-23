import { useForm } from '@mantine/form';
import { Article } from '@prisma/client';
import { useEffect, useRef } from 'react';

const DEFAULT_VALUES = {
	title: '',
	content: '',
	author: '',
	readingTime: null,
	imageId: '',
};

export type ArticleData = Omit<
	Article,
	'categoryId' | 'published' | 'updated_at' | 'created_at' | 'id'
>;

export interface ArticleFormValues {
	title: string;
	content: string;
	author: string;
	readingTime: number | null;
	imageId: string;
}

export default function useArticleForm(article?: ArticleData) {
	// Keep track if the hook is being called for the first time
	const isFirstLaunch = useRef(true);

	const form = useForm<ArticleFormValues>({
		initialValues: article ? article : DEFAULT_VALUES,

		validate: {
			title: (val) => (val ? null : 'Questo campo è necessario'),
			content: (val) => (val ? null : 'Questo campo è necessario'),
			author: (val) => (val ? null : 'Questo campo è necessario'),
			readingTime: (val) => (val ? null : 'Questo campo è necessario'),
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
