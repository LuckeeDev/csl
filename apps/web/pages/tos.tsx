import { IconExternalLink } from '@tabler/icons-react';
import TextLink from 'components/links/TextLink';
import { environment } from 'environments/environment';
import { readFileSync } from 'fs';
import { GetStaticProps } from 'next';
import { join } from 'path';
import { ReactNode, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './tos.module.css';

interface TosProps {
	tosContents: string;
}

interface CustomMarkdownLinkProps {
	href: string;
	children: ReactNode;
	className?: string;
}

function CustomMarkdownLink(props: CustomMarkdownLinkProps) {
	const external = useMemo(
		() =>
			!(props.href?.includes(environment.url) || props.href?.startsWith('/')) ??
			false,
		[props.href]
	);

	return (
		<TextLink
			href={props.href ?? ''}
			target={external ? '_blank' : '_self'}
			className={props.className}
		>
			{props.children}

			{external && <IconExternalLink />}
		</TextLink>
	);
}

export default function Tos({ tosContents }: TosProps) {
	return (
		<ReactMarkdown
			components={{
				a: (props) => (
					<CustomMarkdownLink href={props.href ?? ''} className={styles.link}>
						{props.children}
					</CustomMarkdownLink>
				),
			}}
			className={styles.markdown}
		>
			{tosContents}
		</ReactMarkdown>
	);
}

export const getStaticProps: GetStaticProps<TosProps> = async (ctx) => {
	const filePath = join(process.cwd(), 'public', 'tos.md');

	const tosContents = readFileSync(filePath, 'utf-8');

	return {
		props: {
			tosContents,
		},
	};
};
