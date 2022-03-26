import { useNotifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { Cross1Icon } from '@modulz/radix-icons';

export default function useDataError(error: any) {
	const notifications = useNotifications();

	useEffect(() => {
		if (error) {
			notifications.showNotification({
				title: 'Errore',
				message: "C'è stato un errore nel caricamento dei dati",
				color: 'red',
				icon: <Cross1Icon />,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	return notifications;
}
