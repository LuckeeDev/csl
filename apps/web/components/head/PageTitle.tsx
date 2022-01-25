import Head from 'next/head';

interface PageTitleProps {
	children: string;
}

export default function PageTitle(props: PageTitleProps) {
	return (
		<Head>
			<title>{props.children}</title>
		</Head>
	);
}
