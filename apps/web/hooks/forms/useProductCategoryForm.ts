import { useForm } from '@mantine/form';

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

		validate: {
			name: (val) => (val ? null : 'Questo campo è necessario'),
		},
	});

	return form;
}
