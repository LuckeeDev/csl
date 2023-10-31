import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/dropzone/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import '@mantine/tiptap/styles.layer.css';
import { ReactNode } from 'react';

import AppWrapper from './layout/AppWrapper';
import './styles.css';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="it">
			<head>
				<ColorSchemeScript forceColorScheme="dark" />
			</head>

			<body>
				<MantineProvider forceColorScheme="dark">
					<AppWrapper>{children}</AppWrapper>
				</MantineProvider>
			</body>
		</html>
	);
}
