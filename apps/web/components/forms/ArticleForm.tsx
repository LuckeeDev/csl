import {
	Button,
	Input,
	NumberInput,
	Space,
	Text,
	TextInput,
} from '@mantine/core';
import Editor from 'components/editor/Editor';
import { ArticleFormValues } from 'hooks/forms/useArticleForm';
import { UseFormReturnType } from '@mantine/form';
import { Dropzone } from '@mantine/dropzone';
import { CheckIcon, Cross1Icon, UploadIcon } from '@modulz/radix-icons';
import axios from 'axios';
import { SignedAWSUploadFile } from 'types/aws';
import { useState } from 'react';
import { getImageDimensions } from 'utils/images/getImageDimensions';
import { showNotification } from '@mantine/notifications';
import { v4 } from 'uuid';

interface ArticleFormProps {
	form: UseFormReturnType<ArticleFormValues>;
	onSubmit: (val: ArticleFormValues) => void;
}

export default function ArticleForm({ form, onSubmit }: ArticleFormProps) {
	const [imageUrl, setImageUrl] = useState<string>();

	async function onDrop(files: File[]) {
		const notificationId = v4();

		try {
			showNotification({
				id: notificationId,
				message: 'Caricamento immagini in corso...',
				loading: true,
			});

			const file = files[0];

			const dimensions = await getImageDimensions(file);

			const {
				data: { signedFiles },
			} = await axios.post<{ signedFiles: SignedAWSUploadFile[] }>(
				'/api/aws/signed-url',
				{
					files: [
						{
							fileName: file.name,
							fileType: file.type,
							nativeHeight: dimensions.height,
							nativeWidth: dimensions.width,
						},
					],
					folder: 'articles',
				},
				{ withCredentials: true }
			);

			const signedFile = signedFiles[0];

			await axios.put(signedFile.signedUrl, file, {
				headers: {
					'Content-Type': signedFile.image.type,
				},
			});

			form.setFieldValue('imageId', signedFile.image.id);
			setImageUrl(signedFile.image.url);

			showNotification({
				id: notificationId,
				title: 'Caricamento completato',
				color: 'teal',
				icon: <CheckIcon />,
				message: 'La copertina è stata caricata con successo',
			});
		} catch (err) {
			showNotification({
				id: notificationId,
				title: 'Errore',
				message: "C'è stato un errore durante il caricamento della copertina",
				color: 'red',
				icon: <Cross1Icon />,
			});
		}
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt="La copertina dell'articolo"
					style={{ maxHeight: '300px' }}
				/>
			) : (
				<Dropzone multiple={false} onDrop={onDrop} mb="md">
					<div>
						<UploadIcon />

						<Text size="xl" inline>
							Scegli una copertina per l'articolo.
						</Text>
					</div>
				</Dropzone>
			)}

			<TextInput
				id="title"
				placeholder="Il titolo del tuo articolo"
				{...form.getInputProps('title')}
				required
				label="Titolo"
			/>

			<Space h={20} />

			<Input.Wrapper
				id="content"
				required
				label="Contenuto"
				error={form.errors.content}
			>
				<Editor
					id="content"
					controls={[
						['bold', 'italic', 'underline', 'link'],
						['unorderedList', 'h1', 'h2', 'h3'],
						['sup', 'sub'],
					]}
					value={form.values.content}
					onChange={(val) => form.setFieldValue('content', val)}
				/>
			</Input.Wrapper>

			<Space h={20} />

			<TextInput
				id="author"
				placeholder="Chi ha scritto questo articolo"
				{...form.getInputProps('author')}
				required
				label="Autore"
			/>

			<Space h={20} />

			<NumberInput
				id="readingTime"
				placeholder="Quanto dura questo articolo? (in minuti)"
				{...form.getInputProps('readingTime')}
				required
				label="Tempo di lettura"
			/>

			<Space h={20} />

			<Button type="submit">Salva articolo</Button>
		</form>
	);
}
