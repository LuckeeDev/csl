import { useCallback, useEffect, useState } from 'react';

interface ServiceAccountData {
	name: string;
	email: string;
	image: string;
	accessToken: string;
}

export default function useServiceAccount() {
	const [serviceAccountData, setServiceAccountData] =
		useState<ServiceAccountData | null>(null);

	useEffect(() => {
		const data: ServiceAccountData = JSON.parse(
			sessionStorage.getItem('service-account') || 'null'
		);

		setServiceAccountData(data);
	}, []);

	const updateServiceAccount = useCallback(
		(data: ServiceAccountData) => {
			if (sessionStorage) {
				sessionStorage.setItem('service-account', JSON.stringify(data));
			}

			setServiceAccountData(data);
		},
		[setServiceAccountData]
	);

	return { serviceAccount: serviceAccountData, updateServiceAccount };
}
