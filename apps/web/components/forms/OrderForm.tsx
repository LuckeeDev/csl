import { Button, InputWrapper, NativeSelect, NumberInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { Image, Product } from '@prisma/client';
import { OrderFormValues } from 'hooks/useOrderForm';
import { OmitDates } from 'types/omit';
import ColorChooser from './ColorChooser';

interface OrderFormProps {
	form: UseFormReturnType<OrderFormValues>;
	onSubmit: (val: OrderFormValues) => void;
	product: OmitDates<Product> & { images: OmitDates<Image>[] };
}

export default function OrderForm({ form, onSubmit, product }: OrderFormProps) {
	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			{product.colors?.length > 0 && (
				<ColorChooser
					required
					colors={product.colors}
					{...form.getInputProps('color')}
				/>
			)}

			{product.sizes?.length > 0 && (
				<InputWrapper required label="Taglia">
					<NativeSelect
						data={product.sizes}
						placeholder="Seleziona la taglia per questo capo"
						{...form.getInputProps('size')}
					/>
				</InputWrapper>
			)}

			<InputWrapper required label="Quantità">
				<NumberInput
					placeholder="Inserire la quantità che si vuole acquistare"
					{...form.getInputProps('quantity')}
				/>
			</InputWrapper>

			<Button mt="md" type="submit">
				Ordina
			</Button>
		</form>
	);
}
