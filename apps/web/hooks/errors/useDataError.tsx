import { useEffect } from 'react';
import { Cross1Icon } from '@modulz/radix-icons';
import { showNotification } from '@mantine/notifications';

export default function useDataError(error: any) {
	useEffect(() => {
		if (error) {
			showNotification({
				title: 'Errore',
				message: "C'è stato un errore nel caricamento dei dati",
				color: 'red',
				icon: <Cross1Icon />,
			});
		}
	}, [error]);
}
