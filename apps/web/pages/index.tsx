import ThemeSwitch from '@/components/switch/ThemeSwitch';
import useSession from '@/hooks/session/useSession';
import { Button } from '@mui/material';

export function Index() {
	const { session } = useSession();

	return (
		<>
			<ThemeSwitch />
			<Button>Hi {session && session.user.name}</Button>
		</>
	);
}

export default Index;
