import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function useSignOut() {
	const router = useRouter();

	async function handleSignOut(url = '/') {
		const data = await signOut({ redirect: false, callbackUrl: url });
		router.push(data.url);
	}

	return handleSignOut;
}
