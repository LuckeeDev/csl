import { ColorSchemeScript } from '@mantine/core';
import { Html, Main, NextScript } from 'next/document';
import Head from 'next/head';

export default function Document() {
	return (
	  <Html lang="en">
		<Head>
		  <ColorSchemeScript defaultColorScheme="dark" />
		</Head>
		<body>
		  <Main />
		  <NextScript />
		</body>
	  </Html>
	);
  }
