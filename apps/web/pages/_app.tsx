import useSetupSession from '@/hooks/session/useSetupSession';
import useSetupTheme from '@/hooks/theme/useSetupTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Providers from '@/context/providers/Providers';
import AuthGuard from '@/components/auth/AuthGuard';

export default function App({ Component, pageProps }: AppProps) {
	const sessionContext = useSetupSession();
	const themeContext = useSetupTheme();

	return (
		<Providers sessionContext={sessionContext} themeContext={themeContext}>
			<Head>
				<title>Comitato Studentesco Lussana</title>
			</Head>

			<CssBaseline />

			<div>
				<main>
					{pageProps.requireAuth === true ? (
						<AuthGuard>
							<Component {...pageProps} />
						</AuthGuard>
					) : (
						<Component {...pageProps} />
					)}
				</main>
			</div>
		</Providers>
	);
}
