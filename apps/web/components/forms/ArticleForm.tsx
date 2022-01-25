import {
	Button,
	InputWrapper,
	NumberInput,
	Space,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { Article } from '@prisma/client';
import Editor from 'components/editor/Editor';

export interface ArticleFormValues {
	title: string;
	content: string;
	author: string;
	readingTime: number;
}

interface ArticleFormProps {
	article?: Partial<Article>;
	onSubmit: (val: ArticleFormValues, reset: () => void) => void;
}

const DEFAULT_VALUES = {
	title: '',
	content: '',
	author: '',
	readingTime: null,
};

export default function ArticleForm({ article, onSubmit }: ArticleFormProps) {
	const form = useForm({
		initialValues: article ? article : DEFAULT_VALUES,
		errorMessages: {
			title: 'Questo campo è necessario',
			content: 'Questo campo è necessario',
			author: 'Questo campo è necessario',
			readingTime: 'Questo campo è necessario',
		},
		validationRules: {
			title: (val) => (val ? true : false),
			content: (val) => (val ? true : false),
			author: (val) => (val ? true : false),
			readingTime: (val) => (val ? true : false),
		},
	});

	function resetForm() {
		form.setValues(DEFAULT_VALUES);
	}

	function handleSubmit(val: ArticleFormValues) {
		onSubmit(val, resetForm);
	}

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
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
