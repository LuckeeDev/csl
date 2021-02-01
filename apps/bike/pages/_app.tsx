import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>CSL | Green Lane Project</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}

export default CustomApp;
