import SessionProvider from '@/hooks/session/SessionProvider';
import useSetupSession from '@/hooks/session/useSetupSession';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
	const session = useSetupSession();

	return (
		<SessionProvider session={session}>
			<Head>
				<title>Welcome to web!</title>
			</Head>
			<div>
				<main>
					<Component {...pageProps} />
				</main>
			</div>
		</SessionProvider>
	);
}

export default CustomApp;
