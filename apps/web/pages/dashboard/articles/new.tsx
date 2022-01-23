import { WrapperLinkProps } from 'components/wrapper/types';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Editor from 'components/editor/Editor';
import {
	Button,
	InputWrapper,
	LoadingOverlay,
	NumberInput,
	Space,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import axios from 'axios';
import { environment } from 'environments/environment';
import { CheckIcon } from '@modulz/radix-icons';

interface DashboardArticlesNewProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

const INITIAL_VALUES = {
	title: '',
	content: '',
	author: '',
	readingTime: null,
};

export default function DashboardArticlesNew() {
	const [overlay, setOverlay] = useState(false);
	const notifications = useNotifications();

	const form = useForm({
		initialValues: INITIAL_VALUES,
		errorMessages: {
			title: 'Il titolo è necessario',
			content: 'Il contenuto è necessario',
			author: "L'autore è necessario",
			readingTime: 'Il tempo di lettura è necessario',
		},
		validationRules: {
			title: (val) => (val ? true : false),
			content: (val) => (val ? true : false),
			author: (val) => (val ? true : false),
			readingTime: (val) => (val ? true : false),
		},
	});

	function toggleOverlay() {
		setOverlay((val) => !val);
	}

	async function handleSubmit(val: typeof form.values) {
		toggleOverlay();

		await axios.post(
			`${environment.url}/api/articles`,
			{ article: val },
			{ withCredentials: true }
		);

		form.setValues(INITIAL_VALUES);

		notifications.showNotification({
			title: 'Articolo salvato',
			message: 'Torna alla pagina degli articoli per pubblicarlo!',
			icon: <CheckIcon />,
			color: 'teal',
		});

		toggleOverlay();
	}

	return (
		<div>
			<LoadingOverlay visible={overlay} />

			<h1>Nuovo articolo</h1>

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
		</div>
	);
}

const getServerSideProps: GetServerSideProps<DashboardArticlesNewProps> =
	async () => {
		return {
			props: {
				hasSidebar: true,
				sidebarLinks: [
					{
						icon: 'back',
						color: 'transparent',
						label: 'Torna indietro',
						href: '/dashboard',
					},
					{
						icon: 'list',
						color: 'teal',
						label: 'Articoli pubblicati',
						href: '/dashboard/articles',
					},
					{
						icon: 'write',
						color: 'teal',
						label: 'Nuovo articolo',
						href: '/dashboard/articles/new',
					},
				],
			},
		};
	};

export { getServerSideProps };
