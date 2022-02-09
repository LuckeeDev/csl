import { useForm } from '@mantine/hooks';
import { Product } from '@prisma/client';

export type ProductFormValues = Omit<
	Product,
	'updated_at' | 'created_at' | 'id' | 'price'
> & { price: number | null };

const DEFAULT_VALUES: ProductFormValues = {
	name: '',
	description: '',
	shopSessionId: '',
	categoryId: '',
	colors: [],
	sizes: [],
	price: null,
};

export default function useProductForm(product?: ProductFormValues) {
	const form = useForm<ProductFormValues>({
		initialValues: product ? product : DEFAULT_VALUES,

		errorMessages: {
			name: 'Questo campo è necessario',
			price: 'Questo campo è necessario',
			shopSessionId: 'Questo campo è necessario',
			categoryId: 'Questo campo è necessario',
		},
		validationRules: {
			name: (val) => (val ? true : false),
			price: (val) => (val ? true : false),
			shopSessionId: (val) => (val ? true : false),
			categoryId: (val) => (val ? true : false),
		},
	});

	return form;
}
