import SessionProvider from '@/context/session/SessionProvider';
import useSetupSession from '@/hooks/session/useSetupSession';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import CustomThemeProvider from '@/context/theme/CustomThemeProvider';

function CustomApp({ Component, pageProps }: AppProps) {
	const session = useSetupSession();

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	const lightTheme = createTheme({
		palette: {
			mode: 'light',
		},
	});

	return (
		<SessionProvider session={session}>
			<CustomThemeProvider dark={darkTheme} light={lightTheme}>
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

export default CustomApp;
