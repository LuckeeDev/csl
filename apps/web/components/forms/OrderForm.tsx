import { Button, Input, NativeSelect, NumberInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Image, Product } from '@prisma/client';
import { OrderFormValues } from 'hooks/forms/useOrderForm';
import { OmitDates } from 'types/omit';
import ColorChooser from './ColorChooser';

interface OrderFormProps {
	form: UseFormReturnType<OrderFormValues>;
	onSubmit: (val: OrderFormValues) => void;
	product: OmitDates<Product> & { images: OmitDates<Image>[] };
	className?: string;
}

export default function OrderForm({
	form,
	onSubmit,
	product,
	className,
}: OrderFormProps) {
	return (
		<form onSubmit={form.onSubmit(onSubmit)} className={className}>
			{product.colors?.length > 0 && (
				<ColorChooser
					required
					colors={product.colors}
					{...form.getInputProps('color')}
				/>
			)}

			{product.sizes?.length > 0 && (
				<Input.Wrapper required label="Taglia">
					<NativeSelect
						data={product.sizes}
						placeholder="Seleziona la taglia per questo capo"
						{...form.getInputProps('size')}
					/>
				</Input.Wrapper>
			)}

			<Input.Wrapper required label="Quantità">
				<NumberInput
					placeholder="Inserire la quantità che si vuole acquistare"
					{...form.getInputProps('quantity')}
				/>
			</Input.Wrapper>

			<Button mt="md" type="submit">
				Ordina
			</Button>
		</form>
	);
}
