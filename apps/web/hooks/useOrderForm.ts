import { joiResolver, useForm } from '@mantine/form';
import { ProductSize } from '@prisma/client';
import { PRODUCT_SIZES } from 'data/productSizes';
import Joi from 'joi';

interface RequiredOrderFormValues {
	color: boolean;
	size: boolean;
}

export interface OrderFormValues {
	quantity: number | null;
	color?: string | null;
	size?: ProductSize | null;
}

function generateSchema(requiredValues: RequiredOrderFormValues) {
	return Joi.object<OrderFormValues>({
		quantity: Joi.number().integer().required(),
		...(requiredValues.color && {
			color: Joi.string()
				.regex(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i)
				.required(),
		}),
		...(requiredValues.size && {
			size: Joi.string()
				.valid(...PRODUCT_SIZES)
				.required(),
		}),
	}).required();
}

export default function useOrderForm(requiredValues: RequiredOrderFormValues) {
	const orderFormSchema = generateSchema(requiredValues);

	const form = useForm<OrderFormValues>({
		schema: joiResolver(orderFormSchema),
		initialValues: {
			quantity: null,
			...(requiredValues.color && { color: null }),
			...(requiredValues.size && { size: null }),
		},
	});

	return form;
}
