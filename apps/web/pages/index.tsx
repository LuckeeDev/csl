import SignupModal from '@/components/auth/signup/SignupModal.client';
import PageTitle from '@/components/head/PageTitle';
import { MuiNextLink } from '@/components/link';
import useSession from '@/hooks/session/useSession';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function Index() {
	const router = useRouter();
	const { user } = useSession();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (router.query.signup) {
			if (user && (!user.name || !user.group)) {
				setIsModalOpen(true);
			} else {
				router.push('/');
			}
		}
	}, [user, router]);

	return (
		<>
			<PageTitle>Home</PageTitle>

			<MuiNextLink href="/auth/login">Login</MuiNextLink>

			<SignupModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
}

export default Index;
