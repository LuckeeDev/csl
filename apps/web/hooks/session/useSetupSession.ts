import { SessionContextModel } from '@/context/session/SessionContext';
import { SESSION_LOCAL_TOKEN } from '@/tokens';
import { StrapiUser } from '@csl/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useSetupSession(): SessionContextModel {
	const [user, setUser] = useState<StrapiUser>(null);
	const [initializing, setInitializing] = useState(true);

	const router = useRouter();

	async function revalidate() {
		const data: { user: StrapiUser } = await fetch('/api/session', {
			credentials: 'same-origin',
		}).then((res) => res.json());

		setUser(data.user);
		setInitializing(false);

		if (data.user && (!data.user.name || !data.user.group)) {
			router.push('/?signup=1');
		}
	}

	useEffect(() => {
		const localData =
			JSON.parse(localStorage.getItem(SESSION_LOCAL_TOKEN)) ?? null;

		if (localData) {
			setInitializing(false);
		}
		setUser(localData);

		revalidate();
		// We only need this on startup
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (user !== null) {
			localStorage.setItem(SESSION_LOCAL_TOKEN, JSON.stringify(user));
		} else {
			localStorage.removeItem(SESSION_LOCAL_TOKEN);
		}
	}, [user]);

	return { user, revalidate, initializing };
}
