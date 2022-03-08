import { useForm } from '@mantine/hooks';
import { Article } from '@prisma/client';

export interface ProductCategoryFormValues {
	name: string;
}

const DEFAULT_VALUES: ProductCategoryFormValues = {
	name: '',
};

export type ArticleData = Omit<
	Article,
	'categoryId' | 'updated_at' | 'created_at' | 'id'
>;

export default function useProductCategoryForm(
	productCategory?: ProductCategoryFormValues
) {
	const form = useForm<ProductCategoryFormValues>({
		initialValues: productCategory ? productCategory : DEFAULT_VALUES,

		errorMessages: {
			name: 'Questo campo è necessario',
		},
		validationRules: {
			name: (val) => (val ? true : false),
		},
	});

	return form;
}
