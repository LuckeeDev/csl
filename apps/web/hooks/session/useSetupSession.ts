import { StrapiAuthResponse } from '@csl/types';
import { useEffect, useState } from 'react';

export default function useSetupSession() {
	const [session, setSession] = useState<StrapiAuthResponse>(null);

	useEffect(() => {
		setSession(() => {
			const localData = JSON.parse(localStorage.getItem('session')) ?? null;

			return localData;
		});

		async function updateSession() {
			const data: StrapiAuthResponse = await fetch('/api/session').then((res) =>
				res.json()
			);

			localStorage.setItem('session', JSON.stringify(data));

			setSession(data);
		}

		updateSession();
	}, []);

	return session;
}
