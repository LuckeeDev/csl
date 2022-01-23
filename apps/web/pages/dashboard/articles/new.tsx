import { WrapperLinkProps } from 'components/wrapper/types';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Editor from 'components/editor/Editor';
import {
	Button,
	Input,
	InputWrapper,
	LoadingOverlay,
	Space,
} from '@mantine/core';

interface DashboardArticlesNewProps {
	hasSidebar: boolean;
	sidebarLinks: WrapperLinkProps[];
}

export default function DashboardArticlesNew() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [overlay, setOverlay] = useState(false);

	function toggleOverlay() {
		setOverlay((val) => !val);
	}

	return (
		<div>
			<LoadingOverlay visible={overlay} />

			<h1>Nuovo articolo</h1>

			<InputWrapper id="title" required label="Titolo">
				<Input
					id="title"
					placeholder="Il titolo del tuo articolo"
					value={title}
					onChange={(val) => setTitle(val)}
				/>
			</InputWrapper>

			<Space h={20} />

			<InputWrapper id="content" required label="Contenuto">
				<Editor
					id="content"
					value={content}
					onChange={(val) => setContent(val)}
					controls={[
						['bold', 'italic', 'underline', 'link', 'image'],
						['unorderedList', 'h1', 'h2', 'h3'],
						['sup', 'sub'],
						['alignLeft', 'alignCenter', 'alignRight'],
					]}
				/>
			</InputWrapper>

			<Space h={20} />

			<InputWrapper id="author" required label="Autore">
				<Input
					id="author"
					placeholder="Chi ha scritto questo articolo"
					value={title}
					onChange={(val) => setTitle(val)}
				/>
			</InputWrapper>

			<Space h={20} />

			<InputWrapper id="readingTime" required label="Tempo di lettura">
				<Input
					id="readingTime"
					placeholder="Quanto dura questo articolo? (in minuti)"
					value={title}
					onChange={(val) => setTitle(val)}
				/>
			</InputWrapper>

			<Space h={20} />

			<Button onClick={toggleOverlay}>Salva articolo</Button>
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
