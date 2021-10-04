import useSetupSession from '@/hooks/session/useSetupSession';
import useSetupTheme from '@/hooks/theme/useSetupTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Providers from '@/context/providers/Providers';

export default function App({ Component, pageProps }: AppProps) {
	const sessionContext = useSetupSession();
	const themeContext = useSetupTheme();

	return (
		<Providers sessionContext={sessionContext} themeContext={themeContext}>
			<Head>
				<title>Welcome to web!</title>
			</Head>

			<CssBaseline />

			<div>
				<main>
					<Component {...pageProps} />
				</main>
			</div>
		</Providers>
	);
}
