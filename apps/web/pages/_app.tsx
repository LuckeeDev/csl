import useSetupSession from '@/hooks/session/useSetupSession';
import useSetupTheme from '@/hooks/theme/useSetupTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Providers from '@/context/providers/Providers';
import AuthGuard from '@/components/auth/AuthGuard';
import { Wrapper } from '@/components/wrapper';
import { NavLinkData } from '@csl/types';
import './style.css';

const NAV_LINKS: NavLinkData[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Articoli', href: '/articles' },
];

export default function App({ Component, pageProps }: AppProps) {
	const sessionContext = useSetupSession();
	const themeContext = useSetupTheme();

	return (
		<Providers sessionContext={sessionContext} themeContext={themeContext}>
			<Head>
				<title>Comitato Studentesco Lussana</title>
			</Head>

			<CssBaseline />

			<Wrapper links={NAV_LINKS}>
				{pageProps.requireAuth === true ? (
					<AuthGuard>
						<Component {...pageProps} />
					</AuthGuard>
				) : (
					<Component {...pageProps} />
				)}
			</Wrapper>
		</Providers>
	);
}
