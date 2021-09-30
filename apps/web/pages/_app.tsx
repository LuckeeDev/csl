import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Welcome to web!</title>
			</Head>
			<div>
				<main>
					<Component {...pageProps} />
				</main>
			</div>
		</>
	);
}

export default CustomApp;
