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
import { ChangeEvent, useCallback } from 'react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useNotifications } from '@mantine/notifications';
import { Cross1Icon } from '@modulz/radix-icons';
import axios from 'axios';

interface ProductFormProps {
	form: UseForm<ProductFormValues>;
	onSubmit: (val: ProductFormValues) => void;
	shopSessions: Pick<ShopSession, 'id' | 'name'>[];
	productCategories: Pick<ProductCategory, 'id' | 'name'>[];
}

export default function ProductForm({
	form,
	onSubmit,
	shopSessions,
	productCategories,
}: ProductFormProps) {
	const notifications = useNotifications();

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

	async function handleFileDrop(droppedFiles: File[]) {
		const files = droppedFiles.map((f) => ({
			fileName: f.name,
			fileType: f.type,
		}));

		const res = await axios.post(
			'/api/aws/signed-url',
			{ files },
			{ withCredentials: true }
		);

		console.log(res.data);
	}

	function imageError() {
		notifications.showNotification({
			title: 'Formato non accettato',
			message: "Devi caricare un'immagine per questo prodotto!",
			icon: <Cross1Icon />,
			color: 'red',
		});
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)} style={{ width: '100%' }}>
			<InputWrapper id="name" required label="Nome">
				<TextInput
					id="name"
					placeholder="Il nome del prodotto"
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
					precision={2}
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

			<InputWrapper label="Immagini">
				<Dropzone
					accept={IMAGE_MIME_TYPE}
					onDrop={handleFileDrop}
					onReject={imageError}
				>
					{(status) => <>{JSON.stringify(status)}</>}
				</Dropzone>
			</InputWrapper>

			<Space h={20} />

			<Button type="submit">Salva prodotto</Button>
		</form>
	);
}
