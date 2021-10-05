import useSession from '@/hooks/session/useSession';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface AuthGuardProps {
	children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
	const {
		user,
		initializing,
	} = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!initializing && !user) {
			router.replace('/auth/login');
		}
	}, [user, router, initializing]);

	if (initializing) {
		return <CircularProgress />;
	}

	return <>{children}</>;
}
