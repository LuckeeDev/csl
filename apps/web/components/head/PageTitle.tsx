import Head from 'next/head';
import { ReactNode, useMemo } from 'react';

interface PageTitleProps {
	children: string;
}

const DEFAULT_TITLE = 'Comitato Studentesco Lussana';

export default function PageTitle(props: PageTitleProps) {
	const ogTitle = useMemo(() => {
		switch (typeof props.children) {
			case 'string':
				return props.children;
			case 'object':
				if (Array.isArray(props.children)) {
					return (props.children as string[]).join('');
				} else {
					return DEFAULT_TITLE;
				}
			default:
				return DEFAULT_TITLE;
		}
	}, [props]);

	return (
		<Head>
			<title>{props.children}</title>
			<meta property="og:title" content={ogTitle} />
		</Head>
	);
}
