import { AppProps } from 'next/app';
import Head from 'next/head';
import { NormalizeCSS, GlobalStyles } from '@mantine/core';
import Wrapper from 'components/wrapper/Wrapper';
import Providers from 'components/providers/Providers';
import { NextComponentType, NextPageContext } from 'next';
import { LinkData } from 'navigation/types';

interface CustomAppProps extends AppProps {
	Component: NextComponentType<NextPageContext, any, any> & {
		sidebarLinks: LinkData[];
		hasSidebar: boolean;
	};
}

export default function App(props: CustomAppProps) {
	const {
		Component,
		pageProps: { session, ...pageProps },
	} = props;

	const hasSidebar = Component.hasSidebar ?? false;
	const sidebarLinks = Component.sidebarLinks ?? null;

	return (
		<>
			<Head>
				<title>Comitato Studentesco Lussana</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Providers session={session}>
				<NormalizeCSS />
				<GlobalStyles />

				<Wrapper hasSidebar={hasSidebar} sidebarLinks={sidebarLinks}>
					<Component {...pageProps} />
				</Wrapper>
			</Providers>
		</>
	);
}
