import {
	Button,
	InputWrapper,
	NumberInput,
	Space,
	TextInput,
} from '@mantine/core';
import Editor from 'components/editor/Editor';
import { ArticleFormValues } from 'hooks/forms/useArticleForm';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';
import { Dropzone } from '@mantine/dropzone';
import { UploadIcon } from '@modulz/radix-icons';
import axios from 'axios';
import { SignedAWSUploadFile } from 'types/aws';
import { useState } from 'react';

interface ArticleFormProps {
	form: UseForm<ArticleFormValues>;
	onSubmit: (val: ArticleFormValues) => void;
}

export default function ArticleForm({ form, onSubmit }: ArticleFormProps) {
	const [imageUrl, setImageUrl] = useState<string>();

	async function onDrop(files: File[]) {
		const file = files[0];

		const {
			data: { signedFiles },
		} = await axios.post<{ signedFiles: SignedAWSUploadFile[] }>(
			'/api/aws/signed-url',
			{
				files: [{ fileName: file.name, fileType: file.type }],
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
					{() => (
						<>
							<UploadIcon />
							Scegli una copertina per l'articolo.
						</>
					)}
				</Dropzone>
			)}

			<InputWrapper id="title" required label="Titolo">
				<TextInput
					id="title"
					placeholder="Il titolo del tuo articolo"
					{...form.getInputProps('title')}
				/>
			</InputWrapper>

			<Space h={20} />

			<InputWrapper
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
			</InputWrapper>

			<Space h={20} />

			<InputWrapper id="author" required label="Autore">
				<TextInput
					id="author"
					placeholder="Chi ha scritto questo articolo"
					{...form.getInputProps('author')}
				/>
			</InputWrapper>

			<Space h={20} />

			<InputWrapper id="readingTime" required label="Tempo di lettura">
				<NumberInput
					id="readingTime"
					placeholder="Quanto dura questo articolo? (in minuti)"
					{...form.getInputProps('readingTime')}
				/>
			</InputWrapper>

			<Space h={20} />

			<Button type="submit">Salva articolo</Button>
		</form>
	);
}
