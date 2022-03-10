import { useForm } from '@mantine/hooks';

export interface ProductCategoryFormValues {
	name: string;
}

const DEFAULT_VALUES: ProductCategoryFormValues = {
	name: '',
};

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
