import { useForm } from '@mantine/hooks';

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

		errorMessages: {
			name: 'Questo campo è necessario',
			shopSessionId: 'Questo campo è necessario',
			discountPercentage: 'Questo campo è necessario',
			requiredCategoryId: 'Questo campo è necessario',
			requiredQuantity: 'Questo campo è necessario',
			discountedCategoryId: 'Questo campo è necessario',
			discountedQuantity: 'Questo campo è necessario',
		},
		validationRules: {
			name: (val) => (val ? true : false),
			shopSessionId: (val) => (val ? true : false),
			discountPercentage: (val) => (val ? true : false),
			requiredCategoryId: (val) => (val ? true : false),
			requiredQuantity: (val) => (val ? true : false),
			discountedCategoryId: (val) => (val ? true : false),
			discountedQuantity: (val) => (val ? true : false),
		},
	});

	return form;
}
