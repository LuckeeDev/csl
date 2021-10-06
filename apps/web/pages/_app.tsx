import useSetupSession from '@/hooks/session/useSetupSession';
import useSetupTheme from '@/hooks/theme/useSetupTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Providers from '@/context/providers/Providers';
import AuthGuard from '@/components/auth/AuthGuard';
import { Nav } from '@csl/next-ui';
import Image from 'next/image';
import WhiteLogo from '@/public/img/logo-white.png';
import DefaultLogo from '@/public/img/logo-default.png';
import ThemeSwitch from '@/components/switch/ThemeSwitch';

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
					<Nav
						logo={
							<Image
								src={
									themeContext.theme.palette.mode === 'dark'
										? WhiteLogo
										: DefaultLogo
								}
								alt="CSL Logo"
								height={80}
								width={80}
							/>
						}
						themeSwitch={<ThemeSwitch />}
						links={[
							{ label: 'Home', href: '/' },
							{ label: 'Articoli', href: '/articles' },
						]}
					></Nav>

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
