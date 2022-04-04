import { AppProps } from 'next/app';
import Head from 'next/head';
import { useMantineTheme } from '@mantine/core';
import Wrapper from 'components/wrapper/Wrapper';
import Providers from 'components/providers/Providers';
import { NextComponentType, NextPageContext } from 'next';
import { LinkData } from 'navigation/types';
import NextNProgress from 'nextjs-progressbar';
import dynamic from 'next/dynamic';
import LoaderDiv from 'components/loader/LoaderDiv';
import 'dayjs/locale/it';

interface CustomAppProps extends AppProps {
	Component: NextComponentType<NextPageContext, any, any> & {
		sidebarLinks?: LinkData[];
		hasSidebar?: boolean;
		hasLocalCache?: boolean;
	};
}

const SWRLocalCache = dynamic(
	() => import('../components/providers/SWRLocalCache'),
	{ ssr: false, loading: () => <LoaderDiv /> }
);

export default function App(props: CustomAppProps) {
	const {
		Component,
		pageProps: { session, ...pageProps },
	} = props;

	const theme = useMantineTheme();

	const hasSidebar = Component.hasSidebar ?? false;
	const sidebarLinks = Component.sidebarLinks ?? null;
	const hasLocalCache = Component.hasLocalCache ?? false;

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link rel="icon" href="/favicon.ico" />

				<title>Comitato Studentesco Lussana</title>
				<meta property="og:title" content="Comitato Studentesco Lussana" />

				<meta
					name="description"
					content="Sito del Comitato Studentesco del Liceo Lussana di Bergamo: accedi a tutte le attività riguardanti la vita scolastica da un unico posto!"
				/>
				<meta
					property="og:description"
					content="Sito del Comitato Studentesco del Liceo Lussana di Bergamo: accedi a tutte le attività riguardanti la vita scolastica da un unico posto!"
				/>

				<meta property="og:site_name" content="cslussana.com" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/icons/icon-192x192.png" />
				<meta property="og:url" content="https://cslussana.com" />
			</Head>

			<Providers session={session}>
				<NextNProgress
					color={theme.colors.blue[5]}
					height={2}
					options={{ showSpinner: false }}
					showOnShallow={false}
				/>

				<Wrapper hasSidebar={hasSidebar} sidebarLinks={sidebarLinks}>
					{hasLocalCache ? (
						<SWRLocalCache>
							<Component {...pageProps} />
						</SWRLocalCache>
					) : (
						<Component {...pageProps} />
					)}
				</Wrapper>
			</Providers>
		</>
	);
}
