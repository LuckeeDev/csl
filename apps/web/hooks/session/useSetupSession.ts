import { SESSION_LOCAL_TOKEN } from '@/tokens';
import { StrapiAuthResponse } from '@csl/types';
import { useEffect, useState } from 'react';

export default function useSetupSession() {
	const [session, setSession] = useState<StrapiAuthResponse>(null);

	async function revalidate() {
		const data = await fetch('/api/session').then((res) => res.json());

		setSession(data);
	}

	useEffect(() => {
		const localData =
			JSON.parse(localStorage.getItem(SESSION_LOCAL_TOKEN)) ?? null;
		setSession(localData);

		revalidate();
	}, []);

	useEffect(() => {
		localStorage.setItem(SESSION_LOCAL_TOKEN, JSON.stringify(session));
	}, [session]);

	return { session, revalidate };
}
