import { useForm } from '@mantine/form';
import { Product } from '@prisma/client';

export type ProductFormValues = Omit<
	Product,
	'updated_at' | 'created_at' | 'id' | 'price'
> & { price: number | null; images: string[] };

export const DEFAULT_PRODUCT_VALUES: ProductFormValues = {
	name: '',
	description: '',
	shopSessionId: '',
	categoryId: '',
	colors: [],
	sizes: [],
	price: null,
	images: [],
};

export default function useProductForm(product?: ProductFormValues) {
	const form = useForm<ProductFormValues>({
		initialValues: product ? product : DEFAULT_PRODUCT_VALUES,

		validate: {
			name: (val) => (val ? null : 'Questo campo è necessario'),
			price: (val) => (val ? null : 'Questo campo è necessario'),
			shopSessionId: (val) => (val ? null : 'Questo campo è necessario'),
			categoryId: (val) => (val ? null : 'Questo campo è necessario'),
		},
	});

	return form;
}
