import { useForm } from '@mantine/form';

export interface ProductDiscountFormValues {
	name: string;
	shopSessionId: string;

	discountPercentage: number | null;

	requiredCategoryId: string;
	requiredQuantity: number | null;

	discountedCategoryId: string;
	discountedQuantity: number | null;
}

const DEFAULT_VALUES: ProductDiscountFormValues = {
	name: '',
	shopSessionId: '',

	discountPercentage: null,

	requiredCategoryId: '',
	requiredQuantity: null,

	discountedCategoryId: '',
	discountedQuantity: null,
};

export default function useProductDiscountForm(
	productDiscount?: ProductDiscountFormValues
) {
	const form = useForm<ProductDiscountFormValues>({
		initialValues: productDiscount ? productDiscount : DEFAULT_VALUES,

		validate: {
			name: (val) => (val ? null : 'Questo campo è necessario'),
			shopSessionId: (val) => (val ? null : 'Questo campo è necessario'),
			discountPercentage: (val) => (val ? null : 'Questo campo è necessario'),
			requiredCategoryId: (val) => (val ? null : 'Questo campo è necessario'),
			requiredQuantity: (val) => (val ? null : 'Questo campo è necessario'),
			discountedCategoryId: (val) => (val ? null : 'Questo campo è necessario'),
			discountedQuantity: (val) => (val ? null : 'Questo campo è necessario'),
		},
	});

	return form;
}
