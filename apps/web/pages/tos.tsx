import { createStyles } from '@mantine/core';
import { readFileSync } from 'fs';
import { GetStaticProps } from 'next';
import { join } from 'path';
import ReactMarkdown from 'react-markdown';

interface TosProps {
	tosContents: string;
}

const useStyles = createStyles((theme) => ({
	markdown: {
		a: {
			color: theme.colors.dark[0],
			':hover': { color: theme.colors.blue[4] },
		},
		p: {
			margin: `${theme.spacing.xs}px 0`,
		},
	},
}));

export default function Tos({ tosContents }: TosProps) {
	const { classes } = useStyles();

	return (
		<ReactMarkdown className={classes.markdown}>{tosContents}</ReactMarkdown>
	);
}

export const getStaticProps: GetStaticProps<TosProps> = async (ctx) => {
	const filePath = join(process.cwd(), 'assets', 'tos.md');

	const tosContents = readFileSync(filePath, 'utf-8');

	return {
		props: {
			tosContents,
		},
	};
};
