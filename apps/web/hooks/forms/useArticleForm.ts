import { useForm } from '@mantine/hooks';
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

		errorMessages: {
			title: 'Questo campo è necessario',
			content: 'Questo campo è necessario',
			author: 'Questo campo è necessario',
			readingTime: 'Questo campo è necessario',
		},
		validationRules: {
			title: (val) => (val ? true : false),
			content: (val) => (val ? true : false),
			author: (val) => (val ? true : false),
			readingTime: (val) => (val ? true : false),
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
