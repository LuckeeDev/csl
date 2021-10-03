import useSession from '@/hooks/session/useSession';
import { Button } from '@mui/material';

export function Index() {
	const { session } = useSession();

	return <Button>Hi {session && session.user.name}</Button>;
}

export default Index;
