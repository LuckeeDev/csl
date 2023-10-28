import {
	Button,
	Input,
	NativeSelect,
	NumberInput,
	Space,
	TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { ProductCategory, ShopSession } from '@prisma/client';
import { ProductDiscountFormValues } from 'hooks/forms/useProductDiscountForm';

interface ProductDiscountFormProps {
	form: UseFormReturnType<ProductDiscountFormValues>;
	onSubmit: (val: ProductDiscountFormValues) => void;
	shopSessions: Pick<ShopSession, 'id' | 'name'>[];
	productCategories: Pick<ProductCategory, 'id' | 'name'>[];
}

export default function ProductDiscountForm({
	form,
	onSubmit,
	shopSessions,
	productCategories,
}: ProductDiscountFormProps) {
	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Input.Wrapper id="name" required label="Nome">
				<TextInput
					id="name"
					placeholder="Il nome di questa offerta di sconto"
					{...form.getInputProps('name')}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper id="shopSessionId" label="Sessione di vendita" required>
				<NativeSelect
					data={shopSessions.map((s) => ({ value: s.id, label: s.name }))}
					id="shopSessionId"
					placeholder="Seleziona una sessione"
					{...form.getInputProps('shopSessionId')}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper
				id="discountPercentage"
				label="Percentuale di sconto"
				required
			>
				<NumberInput
					id="discountPercentage"
					step={1}
					decimalScale={0}
					max={100}
					min={0}
					placeholder="La percentuale di sconto da applicare alla categoria scontata"
					{...form.getInputProps('discountPercentage')}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper
				id="requiredCategoryId"
				label="Categoria richiesta"
				required
			>
				<NativeSelect
					data={productCategories.map((s) => ({ value: s.id, label: s.name }))}
					id="requiredCategoryId"
					placeholder="Categoria necessaria per applicare lo sconto"
					{...form.getInputProps('requiredCategoryId')}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper
				id="requiredQuantity"
				label="Quantità di prodotti della categoria richiesta"
				required
			>
				<NumberInput
					step={1}
					decimalScale={0}
					placeholder="Il numero di prodotti necessari per poter applicare lo sconto"
					{...form.getInputProps('requiredQuantity')}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper
				id="discountedCategoryId"
				label="Categoria scontata"
				description="N.B: può essere uguale alla 'Categoria richiesta'"
				required
			>
				<NativeSelect
					data={productCategories.map((s) => ({ value: s.id, label: s.name }))}
					id="discountedCategoryID"
					placeholder="Categoria a cui viene applicato lo sconto"
					{...form.getInputProps('discountedCategoryId')}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper
				id="discountedQuantity"
				label="Quantità di prodotti della categoria scontata"
				required
			>
				<NumberInput
					step={1}
					decimalScale={0}
					placeholder="Il numero di prodotti a cui viene applicato lo sconto"
					{...form.getInputProps('discountedQuantity')}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Button type="submit">Conferma</Button>
		</form>
	);
}
