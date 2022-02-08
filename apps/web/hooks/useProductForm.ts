import { useForm } from '@mantine/hooks';
import { Product } from '@prisma/client';

export type ProductData = Omit<Product, 'updated_at' | 'created_at' | 'id'>;

export interface ProductFormValues {
	name: string;
	description: string | null;
	shopSessionId: string;
	categoryId: string;
	price: number | null;
}

const START_DEFAULT_VALUE = new Date();
const END_DEFAULT_VALUE = new Date();

END_DEFAULT_VALUE.setMonth(START_DEFAULT_VALUE.getMonth() + 1);

const DEFAULT_VALUES: ProductFormValues = {
	name: '',
	description: '',
	shopSessionId: '',
	categoryId: '',
	price: null,
};

export default function useProductForm(product?: ProductData) {
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
