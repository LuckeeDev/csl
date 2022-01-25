import {
	Button,
	InputWrapper,
	NumberInput,
	Space,
	TextInput,
} from '@mantine/core';
import Editor from 'components/editor/Editor';
import { ArticleFormValues } from 'hooks/useArticleForm';
import { UseForm } from '@mantine/hooks/lib/use-form/use-form';

interface ArticleFormProps {
	form: UseForm<ArticleFormValues>;
	onSubmit: (val: ArticleFormValues) => void;
}

export default function ArticleForm({ form, onSubmit }: ArticleFormProps) {
	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
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
						['bold', 'italic', 'underline', 'link', 'image'],
						['unorderedList', 'h1', 'h2', 'h3'],
						['sup', 'sub'],
						['alignLeft', 'alignCenter', 'alignRight'],
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
