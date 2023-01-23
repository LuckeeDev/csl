import {
	ActionIcon,
	Button,
	Checkbox,
	ColorInput,
	Grid,
	Group,
	Input,
	NativeSelect,
	NumberInput,
	SimpleGrid,
	Space,
	Text,
	TextInput,
} from '@mantine/core';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import { ProductFormValues } from 'hooks/forms/useProductForm';
import { PRODUCT_SIZES } from 'data/productSizes';
import { ProductCategory, ProductSize, ShopSession } from '@prisma/client';
import { ChangeEvent, useCallback, useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useNotifications } from '@mantine/notifications';
import { Cross1Icon, CheckIcon, UploadIcon } from '@modulz/radix-icons';
import axios from 'axios';
import { SignedAWSUploadFile } from 'types/aws';
import { ImageData } from 'types/image';
import { getImageDimensions } from 'utils/images/getImageDimensions';

interface ProductFormProps {
	form: UseForm<ProductFormValues>;
	onSubmit: (val: ProductFormValues) => void;
	shopSessions: Pick<ShopSession, 'id' | 'name'>[];
	productCategories: Pick<ProductCategory, 'id' | 'name'>[];
	existingImages?: ImageData[];
}

export default function ProductForm({
	form,
	onSubmit,
	shopSessions,
	productCategories,
	existingImages,
}: ProductFormProps) {
	const startingImages = existingImages
		? existingImages.map((image): [string, ImageData] => [image.id, image])
		: [];

	const [images, setImages] = useState<Map<string, ImageData>>(
		new Map(startingImages)
	);
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
		try {
			const files = await Promise.all(
				droppedFiles.map(async (f) => {
					const dimensions = await getImageDimensions(f);

					return {
						fileName: f.name,
						fileType: f.type,
						nativeHeight: dimensions.height,
						nativeWidth: dimensions.width,
					};
				})
			);

			const {
				data: { signedFiles },
			} = await axios.post<{ signedFiles: SignedAWSUploadFile[] }>(
				'/api/aws/signed-url',
				{ files, folder: 'products' },
				{ withCredentials: true }
			);

			setImages((map) => {
				signedFiles.forEach((file) => {
					map.set(file.image.id, file.image);
				});

				return map;
			});

			const uploadPromises = signedFiles.map((file) => {
				return axios.put(
					file.signedUrl,
					droppedFiles.find((f) => f.name === file.image.name),
					{
						headers: {
							'Content-Type': file.image.type,
						},
					}
				);
			});

			await Promise.all(uploadPromises);

			const previousImages = form.values.images;

			form.setFieldValue('images', [
				...previousImages,
				...signedFiles.map((f) => f.image.id),
			]);

			notifications.showNotification({
				title: 'Immagini caricate correttamente',
				message:
					'Le immagini sono state caricate correttamente e possono ora essere collegate a questo prodotto.',
				icon: <CheckIcon />,
				color: 'teal',
			});
		} catch (err) {
			notifications.showNotification({
				title: 'Errore',
				message: "C'è stato un errore durante il caricamento delle immagini!",
				icon: <Cross1Icon />,
				color: 'red',
			});
		}
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
			<Input.Wrapper id="name" required label="Nome">
				<TextInput
					id="name"
					placeholder="Il nome del prodotto"
					{...form.getInputProps('name')}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper id="description" label="Descrizione">
				<TextInput
					id="description"
					placeholder="Descrizione del prodotto"
					{...form.getInputProps('description')}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper id="price" label="Prezzo" required>
				<NumberInput
					precision={2}
					icon={'€'}
					id="price"
					placeholder="Prezzo del prodotto"
					{...form.getInputProps('price')}
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

			<Input.Wrapper id="categoryId" label="Categoria" required>
				<NativeSelect
					data={productCategories.map((s) => ({ value: s.id, label: s.name }))}
					id="categoryId"
					placeholder="Seleziona una categoria"
					{...form.getInputProps('categoryId')}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper id="sizes" label="Taglie">
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
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper id="colors" label="Colori">
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
			</Input.Wrapper>

			<Space h={20} />

			<Input.Wrapper label="Immagini">
				<Dropzone
					accept={IMAGE_MIME_TYPE}
					onDrop={handleFileDrop}
					onReject={imageError}
				>
					<div>
						<UploadIcon />

						<Text size="xl" inline>
							Trascina qui le immagini per questo prodotto.
						</Text>
					</div>
				</Dropzone>
			</Input.Wrapper>

			<Space h={20} />

			<SimpleGrid cols={4}>
				{form.values.images.map((imageId, i) => (
					<img
						style={{ width: '100%' }}
						key={i}
						src={images.get(imageId)?.url ?? ''}
						alt={`Immagine del prodotto ${i + 1}`}
					/>
				))}
			</SimpleGrid>

			<Space h={20} />

			<Button type="submit">Salva prodotto</Button>

			<Space h={20} />
		</form>
	);
}
