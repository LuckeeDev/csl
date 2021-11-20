import SignupModal from '@/components/auth/signup/SignupModal.client';
import PageTitle from '@/components/head/PageTitle';
import { MuiNextLink } from '@/components/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function Index() {
	const route = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (route.query.signup) {
			setIsModalOpen(true);
		}
	}, [route.query.signup]);

	return (
		<>
			<PageTitle>Home</PageTitle>

			<MuiNextLink href="/auth/login">Login</MuiNextLink>

			<SignupModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
}

export default Index;
