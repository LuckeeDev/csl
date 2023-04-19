import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProvidersProps {
	children: ReactNode;
	session: Session;
}

export default function Providers(props: ProvidersProps) {
	return (
		<SessionProvider session={props.session}>
			<MantineProvider
				theme={{
					colorScheme: 'dark',
					datesLocale: 'it',
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				<ModalsProvider>
					<Notifications />

					{props.children}
				</ModalsProvider>
			</MantineProvider>
		</SessionProvider>
	);
}
