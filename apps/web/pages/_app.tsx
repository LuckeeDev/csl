import { AppProps } from 'next/app';
import Head from 'next/head';
import { NormalizeCSS, GlobalStyles } from '@mantine/core';
import Wrapper from 'components/wrapper/Wrapper';
import Providers from 'components/providers/Providers';

export default function App(props: AppProps) {
	const {
		Component,
		pageProps: { session, hasSidebar, sidebarLinks, ...pageProps },
	} = props;

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

				<Wrapper
					hasSidebar={hasSidebar ?? false}
					sidebarLinks={sidebarLinks ?? null}
				>
					<Component {...pageProps} />
				</Wrapper>
			</Providers>
		</>
	);
}
