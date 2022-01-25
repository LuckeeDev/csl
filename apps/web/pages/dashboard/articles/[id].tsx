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
import PageTitle from 'components/head/PageTitle';
import BackHeading from 'components/heading/BackHeading';
import { WrapperLinkProps } from 'components/wrapper/types';
import { GetServerSideProps } from 'next';
import prisma from 'prisma/client';

interface DashboardArticlesEditProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
	article: Partial<Article>;
}

export default function DashboardArticlesEdit({
	article,
}: DashboardArticlesEditProps) {
	const form = useForm({
		initialValues: {
			title: article.title,
			author: article.author,
			content: article.content,
			readingTime: article.readingTime,
		},
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

	function handleSubmit(val) {
		console.log(val);
	}

	return (
		<div>
			<PageTitle>Dashboard | Modifica articolo</PageTitle>

			<BackHeading>Modifica articolo</BackHeading>

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

const getServerSideProps: GetServerSideProps<DashboardArticlesEditProps> =
	async (ctx) => {
		const articleID = ctx.params.id as string;

		const article = await prisma.article.findUnique({
			where: { id: articleID },
			select: {
				title: true,
				author: true,
				content: true,
				readingTime: true,
				id: true,
			},
		});

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
				article,
			},
		};
	};

export { getServerSideProps };
