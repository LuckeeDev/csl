import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, NormalizeCSS, GlobalStyles } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Wrapper from '../components/wrapper/Wrapper';
import { SessionProvider } from 'next-auth/react';

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

			<SessionProvider session={session}>
				<MantineProvider
					theme={{
						colorScheme: 'dark',
					}}
				>
					<Wrapper>
						<NormalizeCSS />
						<GlobalStyles />

						<NotificationsProvider>
							<Component {...pageProps} />
						</NotificationsProvider>
					</Wrapper>
				</MantineProvider>
			</SessionProvider>
		</>
	);
}
