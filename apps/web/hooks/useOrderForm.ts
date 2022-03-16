import { joiResolver, useForm } from '@mantine/form';
import { ProductSize } from '@prisma/client';
import { PRODUCT_SIZES } from 'data/productSizes';
import Joi from 'joi';

export interface OrderFormValues {
	quantity: number | null;
	color: string | null;
	size: ProductSize | null;
}

const orderFormSchema = Joi.object<OrderFormValues>({
	quantity: Joi.number().integer().required(),
	color: Joi.string().regex(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i),
	size: Joi.string().valid(...PRODUCT_SIZES),
}).required();

export default function useOrderForm() {
	const form = useForm<OrderFormValues>({
		schema: joiResolver(orderFormSchema),
		initialValues: {
			quantity: null,
			color: null,
			size: null,
		},
	});

	return form;
}
