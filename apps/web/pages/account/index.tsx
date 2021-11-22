import useSession from '@/hooks/session/useSession';
import { Button } from '@mui/material';

export default function AccountHomePage() {
	const { user } = useSession();

	return (
		<>
			{user && (
				<>
					<p>{user.name}</p>
					
					<Button color="warning" href="/api/auth/logout">
						Esci
					</Button>
				</>
			)}
		</>
	);
}
