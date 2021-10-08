import useSession from '@/hooks/session/useSession';

export default function AccountHomePage() {
	const { user } = useSession();

	return <>{user && <p>{user.name}</p>}</>;
}
