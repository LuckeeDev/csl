import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
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
			<MantineProvider forceColorScheme="dark">
				<DatesProvider settings={{ locale: 'it' }}>
					<ModalsProvider>
						<Notifications />

						{props.children}
					</ModalsProvider>
				</DatesProvider>
			</MantineProvider>
		</SessionProvider>
	);
}
