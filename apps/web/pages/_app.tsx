import SessionProvider from '@/context/session/SessionProvider';
import useSetupSession from '@/hooks/session/useSetupSession';
import useSetupTheme from '@/hooks/theme/useSetupTheme';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import CustomThemeProvider from '@/context/theme/CustomThemeProvider';

export default function App({ Component, pageProps }: AppProps) {
	const session = useSetupSession();

	const dark = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	const light = createTheme({
		palette: {
			mode: 'light',
		},
	});
	
	const themeContext = useSetupTheme({ dark, light });

	return (
		<SessionProvider session={session}>
			<CustomThemeProvider context={themeContext}>
				<Head>
					<title>Welcome to web!</title>
				</Head>

				<CssBaseline />

				<div>
					<main>
						<Component {...pageProps} />
					</main>
				</div>
			</CustomThemeProvider>
		</SessionProvider>
	);
}
