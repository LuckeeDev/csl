import {
	ActionIcon,
	Button,
	Checkbox,
	ColorInput,
	Grid,
	Group,
	InputWrapper,
	NativeSelect,
	NumberInput,
	Space,
	TextInput,
} from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import { ProductFormValues } from 'hooks/useProductForm';
import { PRODUCT_SIZES } from 'data/productSizes';
import { ProductCategory, ProductSize, ShopSession } from '@prisma/client';
import { Cross1Icon } from '@modulz/radix-icons';
import { ChangeEvent, useCallback } from 'react';

interface ProductFormProps {
	form: UseForm<ProductFormValues>;
	onSubmit: (val: ProductFormValues) => void;
	shopSessions: ShopSession[];
	productCategories: ProductCategory[];
}

export default function ProductForm({
	form,
	onSubmit,
	shopSessions,
	productCategories,
}: ProductFormProps) {
	const randomColor = () =>
		`#${Math.floor(Math.random() * 16777215).toString(16)}`;

	function handleColorChange(val: string, index: number) {
		const colors = form.values.colors;
		colors[index] = val;

		form.setFieldValue('colors', colors);
	}

	function addColor() {
		form.setFieldValue('colors', [...form.values.colors, randomColor()]);
	}

	function removeColor(index: number) {
		const colors = form.values.colors;
		colors.splice(index, 1);

		form.setFieldValue('colors', colors);
	}

	const isSizeChecked = useCallback(
		(size: ProductSize) => form.values.sizes.includes(size),
		[form.values.sizes]
	);

	function handleSizeChange(
		event: ChangeEvent<HTMLInputElement>,
		size: ProductSize
	) {
		const sizes = form.values.sizes;

		const checked = event.currentTarget.checked;

		if (checked === true && !sizes.includes(size)) {
			sizes.push(size);
		} else if (checked === false && sizes.includes(size)) {
			const index = sizes.findIndex((s) => s === size);
			sizes.splice(index, 1);
		}

		form.setFieldValue('sizes', sizes);
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)} style={{ width: '100%' }}>
			<InputWrapper id="name" required label="Nome">
				<TextInput
					id="name"
					placeholder="Il nome della sessione"
					{...form.getInputProps('name')}
				/>
			</InputWrapper>

			<Space h={20} />

			<InputWrapper id="description" label="Descrizione">
				<TextInput
					id="description"
					placeholder="Descrizione del prodotto"
					{...form.getInputProps('description')}
				/>
			</InputWrapper>

			<Space h={20} />

			<InputWrapper id="price" label="Prezzo" required>
				<NumberInput
					icon={'€'}
					id="price"
					placeholder="Prezzo del prodotto"
					{...form.getInputProps('price')}
				/>
			</InputWrapper>

			<Space h={20} />

			<InputWrapper id="shopSessionId" label="Sessione di vendita" required>
				<NativeSelect
					data={shopSessions.map((s) => ({ value: s.id, label: s.name }))}
					id="shopSessionId"
					placeholder="Seleziona una sessione"
					{...form.getInputProps('shopSessionId')}
				/>
			</InputWrapper>

			<Space h={20} />

			<InputWrapper id="categoryId" label="Categoria" required>
				<NativeSelect
					data={productCategories.map((s) => ({ value: s.id, label: s.name }))}
					id="categoryId"
					placeholder="Seleziona una categoria"
					{...form.getInputProps('categoryId')}
				/>
			</InputWrapper>

			<Space h={20} />

			<InputWrapper id="sizes" label="Taglie">
				<Group>
					{PRODUCT_SIZES.map((s, i) => (
						<Checkbox
							label={s}
							key={i}
							checked={isSizeChecked(s)}
							onChange={(e) => handleSizeChange(e, s)}
						/>
					))}
				</Group>
			</InputWrapper>

			<Space h={20} />

			<InputWrapper id="colors" label="Colori">
				<Grid gutter="sm">
					<Grid.Col span={3}>
						<Button fullWidth onClick={addColor}>
							Aggiungi colore
						</Button>
					</Grid.Col>

					{form.values.colors.map((c, i) => (
						<Grid.Col span={3} key={i}>
							<ColorInput
								value={c}
								onChange={(val) => handleColorChange(val, i)}
								rightSection={
									<ActionIcon color="red" onClick={() => removeColor(i)}>
										<Cross1Icon />
									</ActionIcon>
								}
							/>
						</Grid.Col>
					))}
				</Grid>
			</InputWrapper>

			<Space h={20} />

			<Button type="submit">Salva prodotto</Button>
		</form>
	);
}
