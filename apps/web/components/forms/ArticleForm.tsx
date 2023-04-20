import {
	Button,
	Input,
	NumberInput,
	Space,
	Text,
	TextInput,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconUpload, IconX } from '@tabler/icons-react';
import { Editor as UseEditorReturnType } from '@tiptap/react';
import axios from 'axios';
import Editor from 'components/editor/Editor';
import { ArticleFormValues } from 'hooks/forms/useArticleForm';
import { useState } from 'react';
import { SignedAWSUploadFile } from 'types/aws';
import { getImageDimensions } from 'utils/images/getImageDimensions';
import { v4 } from 'uuid';

interface ArticleFormProps {
	form: UseFormReturnType<ArticleFormValues>;
	onSubmit: (val: ArticleFormValues & { content: string }) => void;
	editor: UseEditorReturnType;
}

export default function ArticleForm({
	form,
	onSubmit,
	editor,
}: ArticleFormProps) {
	const [imageUrl, setImageUrl] = useState<string>();
	const [contentError, setContentError] = useState('');

	function handleSubmit(val: ArticleFormValues) {
		console.log('called1');
		if (editor !== null && editor.getText() !== '') {
			const content = editor.getHTML();

			onSubmit({ ...val, content });
		}
	}

	function handleEditorBlur() {
		if (editor !== null && editor.getText() !== '') {
			setContentError('');
		} else {
			setContentError('Questo campo è necessario');
		}
	}

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
				icon: <IconCheck />,
				message: 'La copertina è stata caricata con successo',
			});
		} catch (err) {
			showNotification({
				id: notificationId,
				title: 'Errore',
				message: "C'è stato un errore durante il caricamento della copertina",
				color: 'red',
				icon: <IconX />,
			});
		}
	}

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt="La copertina dell'articolo"
					style={{ maxHeight: '300px' }}
				/>
			) : (
				<Input.Wrapper error={form.getInputProps('imageId').error}>
					<Dropzone multiple={false} onDrop={onDrop} mb="md">
						<div style={{ display: 'flex' }}>
							<IconUpload />

							<Text>Scegli una copertina per l'articolo.</Text>
						</div>
					</Dropzone>
				</Input.Wrapper>
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
				error={contentError}
				onBlur={handleEditorBlur}
			>
				<Editor editor={editor} />
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
				min={1}
			/>

			<Space h={20} />

			<Button type="submit">Salva articolo</Button>
		</form>
	);
}
