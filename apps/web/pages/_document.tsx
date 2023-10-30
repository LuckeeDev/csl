import { ColorSchemeScript } from '@mantine/core';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<ColorSchemeScript forceColorScheme="dark" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
