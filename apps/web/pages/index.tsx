import PageTitle from '@/components/head/PageTitle';
import MuiNextLink from '@/components/link/MuiNextLink';
import ThemeSwitch from '@/components/switch/ThemeSwitch';
import useSession from '@/hooks/session/useSession';
import { Button } from '@mui/material';

export function Index() {
	const { session } = useSession();

	return (
		<>
			<PageTitle>Home</PageTitle>

			<ThemeSwitch />
			<Button>Hi {session && session.user.name}</Button>
			<MuiNextLink href="/auth/login">Login</MuiNextLink>
		</>
	);
}

export default Index;
