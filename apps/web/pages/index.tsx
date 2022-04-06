import { Title, Text } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { Cross1Icon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function HomePage() {
	const router = useRouter();
	const notifications = useNotifications();
	const messageDisplayed = useRef(false);

	useEffect(() => {
		if (router.query.authError && messageDisplayed.current === false) {
			messageDisplayed.current = true;

			notifications.showNotification({
				title: 'Errore',
				message: "Questo account non è autorizzato all'accesso",
				icon: <Cross1Icon />,
				color: 'red',
			});

			router.push('/', undefined, { shallow: true });
		}
	}, [router, notifications]);

	return (
		<div>
			<Title
				sx={{ fontSize: 80, fontWeight: 900, letterSpacing: -2 }}
				align="center"
				mt={100}
			>
				<Text inherit variant="gradient" component="span">
					CSL
				</Text>
			</Title>

			<Text
				color="dimmed"
				align="center"
				size="lg"
				sx={{ maxWidth: 580 }}
				mx="auto"
				mt="xl"
			>
				Il sito del Comitato Studentesco Lussana.
			</Text>
		</div>
	);
}
