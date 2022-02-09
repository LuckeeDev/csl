import Head from 'next/head';
import { ReactNode } from 'react';

interface PageTitleProps {
	children: ReactNode;
}

export default function PageTitle(props: PageTitleProps) {
	return (
		<Head>
			<title>{props.children}</title>
		</Head>
	);
}
