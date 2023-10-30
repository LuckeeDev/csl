import { Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function HomePage() {
	const router = useRouter();
	const messageDisplayed = useRef(false);

	useEffect(() => {
		if (router.query.authError && messageDisplayed.current === false) {
			messageDisplayed.current = true;

			showNotification({
				title: 'Errore',
				message: "Questo account non è autorizzato all'accesso",
				icon: <IconX />,
				color: 'red',
			});

			router.push('/', undefined, { shallow: true });
		}
	}, [router]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
			}}
		>
			<Title
				style={{ fontSize: 80, fontWeight: 900, letterSpacing: -2 }}
				mt={100}
			>
				<Text inherit variant="gradient" component="span">
					CSL
				</Text>
			</Title>

			<Text c="dimmed" size="lg" style={{ maxWidth: 580 }} mx="auto" mt="xl">
				Il sito del Comitato Studentesco Lussana.
			</Text>
		</div>
	);
}
