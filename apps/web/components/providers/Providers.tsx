import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
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
				<NotificationsProvider>{props.children}</NotificationsProvider>
			</MantineProvider>
		</SessionProvider>
	);
}
