import Head from 'next/head';

interface PageDescriptionProps {
	children: string;
}

export default function PageDescription(props: PageDescriptionProps) {
	return (
		<Head>
			<meta name="description" content={props.children} />
			<meta property="og:description" content={props.children} />
		</Head>
	);
}
