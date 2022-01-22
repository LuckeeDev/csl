import { AppProps } from 'next/app';
import Head from 'next/head';
import { NormalizeCSS, GlobalStyles } from '@mantine/core';
import Wrapper from 'components/wrapper/Wrapper';
import Providers from 'components/providers/Providers';

export default function App(props: AppProps) {
	const {
		Component,
		pageProps: { session, ...pageProps },
	} = props;

	return (
		<>
			<Head>
				<title>Mantine next example</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<Providers session={session}>
				<NormalizeCSS />
				<GlobalStyles />
				<Wrapper>
					<Component {...pageProps} />
				</Wrapper>
			</Providers>
		</>
	);
}
