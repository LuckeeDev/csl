import { useForm } from '@mantine/hooks';
import { Article } from '@prisma/client';

const DEFAULT_VALUES = {
	title: '',
	content: '',
	author: '',
	readingTime: null,
};

export type ArticleData = Omit<
	Article,
	'categoryId' | 'updated_at' | 'created_at' | 'id'
>;

export interface ArticleFormValues {
	title: string;
	content: string;
	author: string;
	readingTime: number | null;
}

export default function useArticleForm(article?: ArticleData) {
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

	return form;
}
