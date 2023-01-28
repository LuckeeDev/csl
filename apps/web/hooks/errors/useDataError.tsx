import { useEffect } from 'react';
import { IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

export default function useDataError(error: any) {
	useEffect(() => {
		if (error) {
			showNotification({
				title: 'Errore',
				message: "C'è stato un errore nel caricamento dei dati",
				color: 'red',
				icon: <IconX />,
			});
		}
	}, [error]);
}
