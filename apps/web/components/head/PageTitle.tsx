import Head from 'next/head';

interface PageTitleProps {
	children: string;
}

export default function PageTitle({ children }: PageTitleProps) {
	return (
		<Head>
			<title>{children} | Comitato Studentesco Lussana</title>
		</Head>
	);
}
