import ThemeSwitch from '@/components/switch/ThemeSwitch';
import useSession from '@/hooks/session/useSession';
import { Button, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export function Index() {
	const { session } = useSession();

	return (
		<>
			<ThemeSwitch />
			<Button>Hi {session && session.user.name}</Button>
			<Link href="/auth/login" passHref>
				<MuiLink>Login</MuiLink>
			</Link>
		</>
	);
}

export default Index;
